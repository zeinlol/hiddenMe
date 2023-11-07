from rest_framework import serializers

from hiddenMe.message import models


class CreateMessageInstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Message
        fields = (
            "user",
            "chat",
            #
            "text",
        )
