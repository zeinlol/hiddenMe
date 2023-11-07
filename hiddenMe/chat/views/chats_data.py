from rest_framework import generics

from hiddenMe.chat import serializers
from hiddenMe.qr_code import models as qr_models


class ChatsDataView(generics.ListAPIView):
    serializer_class = serializers.GetChatInstanceSerializer

    def get_queryset(self):
        chats = []
        for qr_code in qr_models.QRCode.objects.filter(user=self.request.user).iterator():
            chats.extend(qr_code.chats_set.all())
        return chats
