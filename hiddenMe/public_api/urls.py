from django.urls import path, include

app_name = "public_api"
urlpatterns = [
    path(
        "v1/",
        include(
            [
                path("account/", include("hiddenMe.account.urls")),
                path("qr-code/", include("hiddenMe.qr_code.urls")),
                path("chat/", include("hiddenMe.chat.urls")),
            ]
        ),
    ),
]
