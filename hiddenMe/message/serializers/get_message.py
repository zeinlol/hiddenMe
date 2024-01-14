from rest_framework import serializers

from hiddenMe.message import models


class GetMessageInstanceSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True)
    user = serializers.CharField(source='user_id', read_only=True)
    chat = serializers.CharField(source='chat_id', read_only=True)

    class Meta:
        model = models.Message
        fields = (
            "uid",
            "user",
            "chat",
            #
            "text",
            #
            "created_at",
            "modified_at",
        )
        read_only_fields = fields
