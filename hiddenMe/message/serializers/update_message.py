from rest_framework import serializers

from hiddenMe.message import models


class UpdateMessageInstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Message
        fields = (
            "text",
        )
