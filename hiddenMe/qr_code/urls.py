from django.urls import path, include

from hiddenMe.qr_code import views

app_name = "qr"
urlpatterns = [
    path(
        "/",
        include(
            [
                path("", views.CodesDataView.as_view(), ),
                path(
                    "<uuid:qr_uid>/",
                    include(
                        [
                            path("", views.CodeInstanceView.as_view(), ),
                            path(
                                "chats/",
                                include(
                                    [
                                        path("", views.CodeInstanceChats.as_view(), ),
                                        path("new/", views.CodeInstanceNewChat.as_view(), ),
                                    ]
                                ),
                            ),

                        ]
                    ),
                ),
            ]
        ),
    ),
]
