from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import register_converter, path, include
from django.views import defaults as default_views
from hiddenMe.base import converters, views

register_converter(converters.UlidConverter, "ulid")

# noinspection PyUnresolvedReferences
urlpatterns = [
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    path(
        "api/",
        include(
            [
                # User management
                path("account/", include("hiddenMe.account.urls")),
                # Rest framework
                path("api-auth/", include("rest_framework.urls")),
                path("ulid/", views.GenerateUlidAsUuidView.as_view()),
                # path("public/", include("hiddenMe.public_api.urls")),
            ]
        ),
    ),
    # password reset
    path("", include("django.contrib.auth.urls")),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development
    urlpatterns += [
        path("400/", default_views.bad_request, kwargs={"exception": Exception("Bad Request!")}),
        path("403/", default_views.permission_denied, kwargs={"exception": Exception("Permission Denied")}),
        path("404/", default_views.page_not_found, kwargs={"exception": Exception("Page not Found")}),
        path("500/", default_views.server_error),
    ]