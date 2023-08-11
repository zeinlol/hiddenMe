from django.urls import path, include

app_name = "public_api"
urlpatterns = [
    path(
        "v1/",
        include(
            [
                path("account/", include("hiddenMe.account.urls"))
            ]
        ),
    ),
]
