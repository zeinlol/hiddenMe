from django.urls import path

from hiddenMe.chat import consumers


websocket_urlpatterns = [
    path('api/v1/chat/<uuid:chat_uid>/web-chat/', consumers.TextRoomConsumer.as_asgi(), ),
]
