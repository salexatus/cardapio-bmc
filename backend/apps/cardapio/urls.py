"""Rotas da API do cardápio (montadas sob /api/v1/)."""
from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)
router.register("categories", views.CategoryViewSet, basename="category")
router.register("menu-items", views.MenuItemViewSet, basename="menuitem")
router.register("events", views.EventViewSet, basename="event")
router.register("gallery", views.GalleryViewSet, basename="gallery")

urlpatterns = [
    path("health", views.health, name="health"),
    path("site", views.site_data, name="site-data"),
    path("auth/login", views.LoginView.as_view(), name="auth-login"),
    path("auth/logout", views.LogoutView.as_view(), name="auth-logout"),
    path("auth/refresh", views.RefreshView.as_view(), name="auth-refresh"),
    path("auth/me", views.MeView.as_view(), name="auth-me"),
    path("config", views.SiteConfigView.as_view(), name="site-config"),
    path("upload", views.UploadView.as_view(), name="upload"),
] + router.urls
