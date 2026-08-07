"""Helpers para setar/limpar os cookies httpOnly de autenticação."""
from django.conf import settings


def _common_kwargs():
    return {
        "httponly": True,
        "secure": settings.AUTH_COOKIE_SECURE,
        "samesite": settings.AUTH_COOKIE_SAMESITE,
        "path": "/",
    }


def set_auth_cookies(response, access: str, refresh: str):
    """Grava access + refresh como cookies httpOnly na resposta."""
    response.set_cookie(settings.AUTH_COOKIE_ACCESS, access, **_common_kwargs())
    response.set_cookie(settings.AUTH_COOKIE_REFRESH, refresh, **_common_kwargs())
    return response


def clear_auth_cookies(response):
    response.delete_cookie(settings.AUTH_COOKIE_ACCESS, path="/")
    response.delete_cookie(settings.AUTH_COOKIE_REFRESH, path="/")
    return response
