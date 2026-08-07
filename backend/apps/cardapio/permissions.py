"""Permissões do cardápio."""
from rest_framework.permissions import SAFE_METHODS, BasePermission


class ReadOnlyOrAuthenticated(BasePermission):
    """Leitura pública (GET/HEAD/OPTIONS) para o site; escrita só autenticado.

    É o que sustenta o cardápio público sem login, mantendo o CRUD do painel
    protegido por JWT.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)
