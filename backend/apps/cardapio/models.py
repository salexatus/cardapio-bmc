"""Modelos do cardápio — espelham o schema que existia no Supabase
(supabase/schema.sql), preservando os nomes de coluna em snake_case que o
frontend já consome (ex.: best_seller, whatsapp_message)."""
from django.db import models


class Category(models.Model):
    """Categoria do cardápio. id é um slug textual (ex.: 'refeicoes')."""

    id = models.CharField(primary_key=True, max_length=50)
    label = models.CharField(max_length=80)
    icon = models.CharField(max_length=16, blank=True, default="")
    sort = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort"]
        verbose_name = "categoria"
        verbose_name_plural = "categorias"

    def __str__(self):
        return self.label


class MenuItem(models.Model):
    """Item do cardápio."""

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="items", db_column="category"
    )
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    serves = models.CharField(max_length=80, blank=True, default="")
    image = models.TextField(blank=True, default="")  # URL pública
    badge = models.CharField(max_length=40, blank=True, default="")
    best_seller = models.BooleanField(default=False)
    tags = models.JSONField(blank=True, default=list)  # lista de strings
    variations = models.JSONField(null=True, blank=True)
    available = models.BooleanField(default=True)
    sort = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort"]
        verbose_name = "item do cardápio"
        verbose_name_plural = "itens do cardápio"

    def __str__(self):
        return self.name


class Event(models.Model):
    """Evento / atração da casa."""

    title = models.CharField(max_length=120)
    day = models.CharField(max_length=8, blank=True, default="")
    month = models.CharField(max_length=8, blank=True, default="")
    weekday = models.CharField(max_length=24, blank=True, default="")
    time = models.CharField(max_length=16, blank=True, default="")
    artist = models.CharField(max_length=120, blank=True, default="")
    description = models.TextField(blank=True, default="")
    image = models.TextField(blank=True, default="")
    tag = models.CharField(max_length=40, blank=True, default="")
    sort = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort"]
        verbose_name = "evento"
        verbose_name_plural = "eventos"

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    """Foto da galeria (mosaico)."""

    src = models.TextField()  # URL pública
    alt = models.CharField(max_length=160, blank=True, default="")
    span = models.CharField(max_length=20, blank=True, default="")
    sort = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort"]
        verbose_name = "foto da galeria"
        verbose_name_plural = "fotos da galeria"

    def __str__(self):
        return self.alt or f"foto #{self.pk}"


class SiteConfig(models.Model):
    """Configurações gerais do site (linha única, id=1)."""

    id = models.IntegerField(primary_key=True, default=1)
    name = models.CharField(max_length=120, blank=True, default="")
    tagline = models.CharField(max_length=160, blank=True, default="")
    description = models.TextField(blank=True, default="")
    whatsapp = models.CharField(max_length=20, blank=True, default="")
    whatsapp_message = models.TextField(blank=True, default="")
    instagram = models.CharField(max_length=200, blank=True, default="")
    instagram_handle = models.CharField(max_length=80, blank=True, default="")
    address = models.CharField(max_length=200, blank=True, default="")
    maps_query = models.CharField(max_length=200, blank=True, default="")
    maps_embed = models.TextField(blank=True, default="")
    url = models.CharField(max_length=200, blank=True, default="")
    hours = models.CharField(max_length=120, blank=True, default="")
    # Conteúdo editável do site (Hero e títulos das dobras/seções). Estrutura livre
    # em JSON: { hero: {...}, menu: {...}, best_sellers: {...}, gallery: {...},
    # events: {...}, location: {...} }. O frontend aplica defaults quando ausente.
    content = models.JSONField(blank=True, default=dict)

    class Meta:
        verbose_name = "configuração do site"
        verbose_name_plural = "configuração do site"

    def __str__(self):
        return self.name or "Configuração do site"

    def save(self, *args, **kwargs):
        self.id = 1  # garante linha única
        super().save(*args, **kwargs)
