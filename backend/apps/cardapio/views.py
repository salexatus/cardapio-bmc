"""Views da API do cardápio.

- Auth por cookie JWT (login/logout/refresh/me).
- CRUD das coleções (leitura pública, escrita autenticada).
- Endpoint agregado /site para o frontend carregar tudo em uma chamada.
- Upload de imagem para o painel.
"""
import uuid

from django.conf import settings
from django.core.files.storage import default_storage
from django.db import connections
from django.db.utils import OperationalError
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .cookies import clear_auth_cookies, set_auth_cookies
from .models import Category, DrinkPhoto, Event, GalleryImage, MenuItem, SiteConfig
from .permissions import ReadOnlyOrAuthenticated
from .serializers import (
    CategorySerializer,
    DrinkPhotoSerializer,
    EventSerializer,
    GalleryImageSerializer,
    LoginSerializer,
    MenuItemSerializer,
    SiteConfigSerializer,
)


# ===== Healthcheck =====
@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    """Healthcheck público — confirma processo no ar e conexão com o banco."""
    db_ok = True
    db_erro = None
    try:
        connections["default"].cursor()
    except OperationalError as exc:  # pragma: no cover - depende do ambiente
        db_ok = False
        db_erro = str(exc)

    payload = {"status": "ok", "servico": "bmc-api", "banco": "ok" if db_ok else "erro"}
    if db_erro:
        payload["banco_detalhe"] = db_erro
    return Response(payload, status=200 if db_ok else 503)


# ===== Endpoint agregado para o site público =====
@api_view(["GET"])
@permission_classes([AllowAny])
def site_data(request):
    """Tudo que o site público precisa em uma única chamada.

    Espelha o formato de `loadSiteData()` do frontend: { config, categories,
    menu, events, gallery }. Só itens disponíveis entram em `menu`.
    """
    config = SiteConfig.objects.first()
    return Response({
        "source": "api",
        "config": SiteConfigSerializer(config).data if config else None,
        "categories": CategorySerializer(
            Category.objects.all(), many=True
        ).data,
        "menu": MenuItemSerializer(
            MenuItem.objects.filter(available=True), many=True
        ).data,
        "events": EventSerializer(Event.objects.all(), many=True).data,
        "gallery": GalleryImageSerializer(
            GalleryImage.objects.all(), many=True
        ).data,
        "drinks": DrinkPhotoSerializer(
            DrinkPhoto.objects.all(), many=True
        ).data,
    })


# ===== Autenticação =====
def _payload_usuario(user):
    return {
        "usuario": user.username,
        "nome": user.get_full_name() or user.first_name or user.username,
        "email": user.email,
        "admin": user.is_staff or user.is_superuser,
    }


class LoginView(APIView):
    """POST /auth/login — valida credenciais e seta cookies httpOnly."""

    permission_classes = [AllowAny]
    throttle_scope = "login"

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"erro": "credenciais_invalidas"}, status=401)
        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        resp = Response({"usuario": _payload_usuario(user)}, status=200)
        return set_auth_cookies(resp, str(refresh.access_token), str(refresh))


class MeView(APIView):
    """GET /auth/me — dados da sessão atual."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"usuario": _payload_usuario(request.user)})


class RefreshView(APIView):
    """POST /auth/refresh — renova o access (rotaciona refresh) via cookie."""

    permission_classes = [AllowAny]

    def post(self, request):
        refresh = request.COOKIES.get(settings.AUTH_COOKIE_REFRESH)
        if not refresh:
            return Response({"erro": "nao_autenticado"}, status=401)
        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError:
            return Response({"erro": "token_invalido"}, status=401)
        access = serializer.validated_data["access"]
        novo_refresh = serializer.validated_data.get("refresh", refresh)
        resp = Response({"ok": True})
        return set_auth_cookies(resp, access, novo_refresh)


class LogoutView(APIView):
    """POST /auth/logout — revoga o refresh e limpa os cookies."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.COOKIES.get(settings.AUTH_COOKIE_REFRESH)
        if refresh:
            try:
                RefreshToken(refresh).blacklist()
            except TokenError:
                pass
        resp = Response({"ok": True})
        return clear_auth_cookies(resp)


# ===== Upload de imagem (painel) =====
class UploadView(APIView):
    """POST /upload — recebe um arquivo e devolve a URL pública.

    Imagens são redimensionadas (máx 1600px) e convertidas para WebP (leve),
    para o site carregar rápido. Vídeos e outros formatos são salvos como vieram.
    """

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    IMAGE_EXTS = {"jpg", "jpeg", "png", "webp", "bmp", "tiff", "heic", "heif"}
    MAX_SIDE = 1600

    def post(self, request):
        f = request.FILES.get("file") or request.FILES.get("image")
        if not f:
            return Response({"erro": "arquivo_ausente"}, status=400)
        ext = (f.name.rsplit(".", 1)[-1] if "." in f.name else "bin").lower()

        if ext in self.IMAGE_EXTS:
            try:
                import io

                from django.core.files.base import ContentFile
                from PIL import Image, ImageOps

                img = Image.open(f)
                img = ImageOps.exif_transpose(img)
                img = (
                    img.convert("RGBA")
                    if img.mode in ("RGBA", "LA", "P")
                    else img.convert("RGB")
                )
                img.thumbnail((self.MAX_SIDE, self.MAX_SIDE), Image.LANCZOS)
                buf = io.BytesIO()
                img.save(buf, format="WEBP", quality=80, method=6)
                caminho = default_storage.save(
                    f"uploads/{uuid.uuid4().hex}.webp", ContentFile(buf.getvalue())
                )
                url = request.build_absolute_uri(settings.MEDIA_URL + caminho)
                return Response({"url": url}, status=status.HTTP_201_CREATED)
            except Exception:
                f.seek(0)  # otimização falhou → salva o original abaixo

        nome = f"uploads/{uuid.uuid4().hex}.{ext}"
        caminho = default_storage.save(nome, f)
        url = request.build_absolute_uri(settings.MEDIA_URL + caminho)
        return Response({"url": url}, status=status.HTTP_201_CREATED)


# ===== CRUD das coleções =====
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [ReadOnlyOrAuthenticated]

    def perform_create(self, serializer):
        # Gera o id (slug) a partir do nome quando não vier do cliente, garantindo unicidade.
        from django.utils.text import slugify

        cid = (serializer.validated_data.get("id") or "").strip()
        if not cid:
            cid = slugify(serializer.validated_data.get("label", "")) or "categoria"
        base, i = cid, 2
        while Category.objects.filter(pk=cid).exists():
            cid = f"{base}-{i}"
            i += 1
        serializer.save(id=cid)

    def destroy(self, request, *args, **kwargs):
        # category em MenuItem é PROTECT: bloqueia remoção com itens, com mensagem clara.
        from django.db.models import ProtectedError

        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"erro": "Esta categoria tem itens no cardápio. Mova ou exclua os itens antes de removê-la."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DrinkViewSet(viewsets.ModelViewSet):
    queryset = DrinkPhoto.objects.all()
    serializer_class = DrinkPhotoSerializer
    permission_classes = [ReadOnlyOrAuthenticated]


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [ReadOnlyOrAuthenticated]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [ReadOnlyOrAuthenticated]


class GalleryViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [ReadOnlyOrAuthenticated]


class SiteConfigView(APIView):
    """GET/PUT da configuração única do site."""

    permission_classes = [ReadOnlyOrAuthenticated]

    def get(self, request):
        config = SiteConfig.objects.first()
        return Response(SiteConfigSerializer(config).data if config else {})

    def put(self, request):
        config = SiteConfig.objects.first() or SiteConfig()
        serializer = SiteConfigSerializer(config, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
