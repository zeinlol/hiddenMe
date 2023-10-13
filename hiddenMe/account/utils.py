from django.conf import settings


def create_token(token_model, user, _serializer):
    return token_model.objects.create(user=user)

def set_token_cookie(response, token):
    response.set_cookie(
        settings.APP_TOKEN_COOKIE_NAME,
        token,
        max_age=settings.APP_TOKEN_COOKIE_AGE,
        domain=settings.APP_TOKEN_COOKIE_DOMAIN,
        path=settings.APP_TOKEN_COOKIE_PATH,
        secure=settings.APP_TOKEN_COOKIE_SECURE,
        httponly=settings.APP_TOKEN_COOKIE_HTTPONLY,
    )


def delete_token_cookie(response):
    response.delete_cookie(
        settings.APP_TOKEN_COOKIE_NAME,
        path=settings.APP_TOKEN_COOKIE_PATH,
        domain=settings.APP_TOKEN_COOKIE_DOMAIN,
    )
