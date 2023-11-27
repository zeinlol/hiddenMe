from rest_framework import generics, permissions, status, authentication
from rest_framework.response import Response

from hiddenMe.chat import models
from hiddenMe.message import serializers as message_serializers


class GetChatMessagesView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class = message_serializers.GetMessageInstanceSerializer

    def get_queryset(self):
        chat_uid = self.kwargs["chat_uid"]
        chat = models.Chat.objects.get(pk=chat_uid)
        return chat.messages_set.all().order_by('created_at')

    def create(self, request, *args, **kwargs):
        chat_uid = self.kwargs["chat_uid"]
        message_data = request.data
        if hasattr(request.user, "uid"):
            message_data["user"] = request.user.uid
        message_data["chat"] = chat_uid
        serializer = message_serializers.CreateMessageInstanceSerializer(data=message_data)
        serializer.is_valid(raise_exception=True)
        new_message = serializer.save()

        message_serializer = self.serializer_class(new_message)

        return Response(message_serializer.data, status=status.HTTP_201_CREATED)
