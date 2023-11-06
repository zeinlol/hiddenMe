from rest_framework import serializers

from hiddenMe.qr_code import models


class GetQRCodeInstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.QRCode
        fields = (
            "uid",
            "user",
            #
            "title",
            "description",
            "link",
            #
            "icon",
        )
        read_only_fields = fields
