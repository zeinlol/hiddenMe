from django.urls import path, include

from hiddenMe.chat import views

app_name = "chat"
urlpatterns = [
    path(
        "",
        include(
            [
                path("", views.ChatsDataView.as_view(), ),
                path(
                    "<uuid:chat_uid>/",
                    include(
                        [
                            path("", views.ChatInstanceView.as_view(), ),
                            path("messages/", include([]), ),
                        ]
                    ),
                ),
            ]
        ),
    ),
]
