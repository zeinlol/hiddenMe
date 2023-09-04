from rest_framework import generics

from hiddenMe.qr_code import models


class CodeInstanceView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.QRCode.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    