from rest_framework import serializers

from hiddenMe.qr_code import models


class CreateQRCodeInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QRCode
        fields = (
            "user",
            #
            "title",
            "description",
            #
            "icon",
        )

