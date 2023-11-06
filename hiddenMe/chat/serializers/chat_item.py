from rest_framework import serializers

from hiddenMe.chat import models


class ChatInstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Chat
        fields = (
            "uid",
            "qr_code",
        )
        read_only_fields = (
            "uid",
            "qr_code",
        )
