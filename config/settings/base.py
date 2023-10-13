"""
Django settings for hiddenMe project.

Generated by 'django-admin startproject' using Django 4.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import pathlib
from datetime import timedelta

# noinspection PyPackageRequirements
import environ

ROOT_DIR = environ.Path(__file__) - 3  # (hiddenMe/config/settings/base.py - 3 = hiddenMe/)
ROOT_DIR__BY_PATHLIB = pathlib.Path(ROOT_DIR)

APPS_DIR = ROOT_DIR__BY_PATHLIB.joinpath("hiddenMe")

# Load operating system environment variables and then prepare to use them
env = environ.Env()

env_file = str(ROOT_DIR.path(".env"))
print(f"Loading : {env_file}")
env.read_env(env_file)
print("The .env file has been loaded. See base.py for more information")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/


SECRET_KEY = env("DJANGO_SECRET_KEY")

ADMIN_URL = env("DJANGO_ADMIN_URL")

DEBUG = env("DJANGO_DEBUG")

ALLOWED_HOSTS = []


# Application definition

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

LOCAL_APPS = [
    "hiddenMe.account",
    "hiddenMe.base",
    "hiddenMe.chat",
    "hiddenMe.message",
    "hiddenMe.qr_code",
]

THIRD_PARTY_APPS = [
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "knox",
    'rest_framework',
    'corsheaders',
]

INSTALLED_APPS = DJANGO_APPS + LOCAL_APPS + THIRD_PARTY_APPS

MIDDLEWARE = [
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# URL Configuration
# ------------------------------------------------------------------------------
ROOT_URLCONF = "config.urls"

# See: https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# TODO: Rework to use normal database in real project
# DATABASES = {
#     "default": env.db("DATABASE_URL", default="postgresql:///hiddenMe"),
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': f'{ROOT_DIR}/db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# STATIC FILE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = str(ROOT_DIR("staticfiles"))

# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = "/static/"

# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS
STATIC_MAIN_DIR = str(APPS_DIR.joinpath("static"))

STATICFILES_DIRS = [
    STATIC_MAIN_DIR,
]

# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
PUBLIC_SITE_URL = env.str("PUBLIC_SITE_URL", "http://localhost/")


AUTH_USER_MODEL = 'hidden_me_account.User'

CORS_ALLOW_ALL_ORIGINS = env.bool("CORS_ALLOW_ALL_ORIGINS", False)


ACCOUNT_AUTHENTICATION_METHOD = "username_email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "optional"
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

# app token cookie settings
APP_TOKEN_COOKIE_NAME = "hidden_me_token"
# number of second to expire this cookie, sync this with TOKEN_TTL because this token stored in this cookie
APP_TOKEN_COOKIE_AGE = timedelta(days=14).total_seconds()
APP_TOKEN_COOKIE_DOMAIN = None
APP_TOKEN_COOKIE_PATH = "/"
APP_TOKEN_COOKIE_SECURE = False
APP_TOKEN_COOKIE_HTTPONLY = False

# [rest_auth_settings]-[BEGIN]
REST_AUTH = dict(
    SESSION_LOGIN=False,
    OLD_PASSWORD_FIELD_ENABLED=True,
    TOKEN_CREATOR="hiddenMe.account.utils.create_token",
    TOKEN_MODEL="knox.models.AuthToken",
    REGISTER_SERIALIZER="hiddenMe.account.serializers.RegisterSerializer",
    # PASSWORD_RESET_SERIALIZER="hiddenMe.account.serializers.UserPasswordResetSerializer",
)
# [rest_auth_settings]-[END]