from rest_framework import generics

from hiddenMe.qr_code import models, serializers


class CodesListView(generics.ListAPIView):
    queryset = models.QRCode.objects.all()
    serializer_class = serializers.GetQRCodeInstanceSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
