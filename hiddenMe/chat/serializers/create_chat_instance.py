from rest_framework import serializers

from hiddenMe.chat import models


class CreateChatInstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Chat
        fields = (
            "qr_code",
            "title",
            "description",
        )
