from rest_framework import generics

from hiddenMe.chat import models, serializers


class ChatsDataView(generics.ListCreateAPIView):
    queryset = models.Chat.objects.all()
    serializer_class = serializers.ChatInstanceSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
