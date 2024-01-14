from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from hiddenMe.chat import models
from hiddenMe.message import serializers as message_serializers


# noinspection PyArgumentList
class TextRoomConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.chat = None
        self.room_name = None

    def connect(self):
        self.chat = models.Chat.objects.get(uid=self.scope['url_route']['kwargs']['chat_uid'])
        self.room_name = f'chat_{self.chat.uid}'
        async_to_sync(self.channel_layer.group_add)(
            self.room_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        print("Closed websocket with code: ", close_code)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_name, self.channel_name
        )
        self.close()

    def receive_json(self, content, **kwargs):
        content["chat"] = self.chat.uid
        serializer = message_serializers.CreateMessageInstanceSerializer(data=content)
        serializer.is_valid(raise_exception=True)
        new_message = serializer.save()
        new_message_data = message_serializers.GetMessageInstanceSerializer(new_message)
        # send to all connected to chat
        async_to_sync(self.channel_layer.group_send)(
            self.room_name, {"type": "send_chat_message", "message": new_message_data.data}
        )
        # send only to sender
        # self.send_json(content=new_message_data.data)

    def send_chat_message(self, event):
        message = event['message']
        self.send_json(content=message)
