"""Registro no Django admin (painel de emergência)."""
from django.contrib import admin

from .models import Category, Event, GalleryImage, MenuItem, SiteConfig


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "label", "icon", "sort")
    list_editable = ("label", "icon", "sort")


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "best_seller", "available", "sort")
    list_filter = ("category", "best_seller", "available")
    list_editable = ("price", "best_seller", "available", "sort")
    search_fields = ("name", "description")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "day", "month", "weekday", "time", "sort")
    search_fields = ("title", "artist")


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("__str__", "span", "sort")


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("name", "tagline", "whatsapp")
