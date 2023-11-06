from rest_framework import generics, status
from rest_framework.response import Response

from hiddenMe.qr_code import models, serializers


class CodesNewInstanceView(generics.CreateAPIView):
    queryset = models.QRCode.objects.all()
    serializer_class = serializers.CreateQRCodeInstanceSerializer

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user.uid
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        qr_code_instance = serializer.save()
        qr_code_instance.get_qr_core()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

