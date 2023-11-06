from rest_framework import generics

from hiddenMe.chat import models, serializers


class ChatInstanceView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chat.objects.all()
    serializer_class = serializers.ChatInstanceSerializer

    def get_object(self):
        chat_uid = self.kwargs["chat_uid"]
        return models.Chat.objects.filter(user=self.request.user).get(pk=chat_uid)
    