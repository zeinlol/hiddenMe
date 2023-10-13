from rest_framework import generics, status
from rest_framework.response import Response

from hiddenMe.chat import models, serializers


class CodeInstanceChats(generics.CreateAPIView):
    serializer_class = serializers.Chat

    def create(self, request, *args, **kwargs):
        qr_code_uid = self.kwargs["qr_uid"]
        qr_code = self.queryset.get(uid=qr_code_uid)
        new_chat = models.Chat(
            user=qr_code.user,
            qr_code=qr_code,
            title="Anonymous chat"  # TODO: generate more relevant name

        )
        new_chat.save()
        serializer = self.get_serializer(data=new_chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    