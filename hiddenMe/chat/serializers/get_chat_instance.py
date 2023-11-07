from rest_framework import serializers

from hiddenMe.chat import models


class GetChatInstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Chat
        fields = (
            "uid",
            "qr_code",
            "title",
            "description",
        )
        read_only_fields = fields
