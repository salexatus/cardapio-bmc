"""Serializers do cardápio."""
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from rest_framework import serializers

from .models import Category, DrinkPhoto, Event, GalleryImage, MenuItem, SiteConfig

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    # id é o slug (PK). Opcional no POST: se ausente, a view gera a partir do nome.
    id = serializers.CharField(required=False)

    class Meta:
        model = Category
        fields = ["id", "label", "icon", "sort"]


class DrinkPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrinkPhoto
        fields = ["id", "src", "caption", "alt", "sort", "created_at"]


class MenuItemSerializer(serializers.ModelSerializer):
    # Expõe a categoria como o seu slug (id textual), igual ao que o frontend espera.
    category = serializers.SlugRelatedField(
        slug_field="id", queryset=Category.objects.all()
    )

    class Meta:
        model = MenuItem
        fields = [
            "id", "category", "name", "description", "price", "serves",
            "image", "badge", "best_seller", "tags", "variations",
            "available", "sort", "created_at",
        ]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id", "title", "day", "month", "weekday", "time", "artist",
            "description", "image", "video", "tag", "sort", "created_at",
        ]


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ["id", "src", "alt", "span", "sort", "created_at"]


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = [
            "id", "name", "tagline", "description", "whatsapp", "whatsapp_message",
            "instagram", "instagram_handle", "address", "maps_query", "maps_embed",
            "url", "hours", "content",
        ]


class LoginSerializer(serializers.Serializer):
    """Aceita login por usuário OU e-mail (o painel envia e-mail)."""

    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        identifier = attrs["email"].strip()
        password = attrs["password"]

        # Resolve username a partir do e-mail, se necessário.
        username = identifier
        if "@" in identifier:
            match = User.objects.filter(
                Q(email__iexact=identifier) | Q(username__iexact=identifier)
            ).first()
            if match:
                username = match.username

        user = authenticate(username=username, password=password)
        if not user or not user.is_active:
            raise serializers.ValidationError("credenciais_invalidas")
        attrs["user"] = user
        return attrs
