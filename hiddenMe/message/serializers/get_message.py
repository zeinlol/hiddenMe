from rest_framework import serializers

from hiddenMe.message import models


class GetMessageInstanceSerializer(serializers.ModelSerializer):

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
