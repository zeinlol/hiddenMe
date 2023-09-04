from rest_framework import generics

from hiddenMe.qr_code import models


class CodeInstanceChats(generics.ListAPIView):
    queryset = models.QRCode.objects.all()

    def get_queryset(self):
        qr_code_uid = self.kwargs["qr_uid"]
        qr_code = self.queryset.get(uid=qr_code_uid)
        return qr_code.chats_set.all()

    