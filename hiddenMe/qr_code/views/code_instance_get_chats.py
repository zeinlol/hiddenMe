from rest_framework import generics

from hiddenMe.chat import serializers
from hiddenMe.qr_code import models


class CodeInstanceChats(generics.ListAPIView):
    queryset = models.QRCode.objects.all()
    serializer_class = serializers.GetChatInstanceSerializer

    def get_queryset(self):
        qr_code_uid = self.kwargs["qr_uid"]
        qr_code = self.queryset.get(uid=qr_code_uid)
        return qr_code.chats_set.all()

    