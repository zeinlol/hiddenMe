from rest_framework import generics

from hiddenMe.qr_code import models, serializers


class CodeInstanceView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.QRCode.objects.all()
    serializer_class = serializers.GetQRCodeInstanceSerializer

    def get_object(self):
        code_uid = self.kwargs["qr_uid"]
        return self.queryset.get(user=self.request.user, uid=code_uid)

    