from rest_framework import generics

from hiddenMe.chat import models


class ChatInstanceView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chat.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    