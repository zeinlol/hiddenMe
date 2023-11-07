from rest_framework import generics

from hiddenMe.message import models, serializers


class GetMessageInstanceView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.GetMessageInstanceSerializer

    def get_object(self):
        chat_uid = self.kwargs["chat_uid"]
        return models.Message.objects.filter(user=self.request.user).get(pk=chat_uid)
    