"""Rotas raiz do backend BMC.

Padrão versionado: /api/v1/<recurso>. O frontend (Cloudflare Pages) consome
estas rotas; o /admin do Django serve de painel de emergência.
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve as media_serve

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.cardapio.urls")),
    # Mídia (fotos enviadas pelo painel). Baixo tráfego; servida pelo Django.
    # Em escala, mover para o Nginx/CDN.
    re_path(r"^media/(?P<path>.*)$", media_serve, {"document_root": settings.MEDIA_ROOT}),
]
