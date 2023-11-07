from rest_framework import generics, status, permissions
from rest_framework.response import Response

from hiddenMe.chat import serializers
from hiddenMe.qr_code import models as qr_models


class CreateQRCodeChatInstanceView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = serializers.GetChatInstanceSerializer

    def create(self, request, *args, **kwargs):
        qr_code_uid = self.kwargs["qr_uid"]
        qr_code = qr_models.QRCode.objects.all().get(uid=qr_code_uid)
        data = request.data
        data["qr_code"] = qr_code.uid
        serializer = serializers.CreateChatInstanceSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        new_chat = serializer.save()
        serializer = self.get_serializer(new_chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
