from rest_framework import generics, permissions

from hiddenMe.chat import models
from hiddenMe.message import serializers as message_serializers


class GetChatMessagesView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = message_serializers.GetMessageInstanceSerializer

    def get_queryset(self):
        chat_uid = self.kwargs["chat_uid"]
        chat = models.Chat.objects.get(pk=chat_uid)
        return chat.messages_set.all()
