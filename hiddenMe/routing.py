from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from hiddenMe.chat.consumers import TextRoomConsumer

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path('ws/chat/', TextRoomConsumer.as_asgi()),
    ]),
})