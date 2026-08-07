"""Autenticação JWT lendo o access token de um cookie httpOnly."""
from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class CookieJWTAuthentication(JWTAuthentication):
    """Lê o access token do cookie em vez do header Authorization.

    Sem cookie → retorna None (DRF responde 401 quando a view exige auth).
    Cookie com token inválido/expirado → retorna None (trata como anônimo) em vez
    de levantar 401. Isso é essencial: um cookie velho no navegador NÃO pode
    bloquear endpoints públicos como o próprio login (senão o usuário fica preso —
    não consegue relogar porque o cookie expirado derruba a requisição de login).
    Endpoints protegidos continuam exigindo autenticação normalmente.
    """

    def authenticate(self, request):
        raw_token = request.COOKIES.get(settings.AUTH_COOKIE_ACCESS)
        if not raw_token:
            return None
        try:
            validated_token = self.get_validated_token(raw_token)
        except (InvalidToken, TokenError):
            return None
        return self.get_user(validated_token), validated_token
