from rest_framework import generics, permissions

from hiddenMe.chat import models, serializers


class ChatInstanceView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.GetChatInstanceSerializer

    def get_object(self):
        chat_uid = self.kwargs["chat_uid"]
        return models.Chat.objects.get(pk=chat_uid)
    