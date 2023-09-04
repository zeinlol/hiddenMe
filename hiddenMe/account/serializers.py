from django.contrib.auth import get_user_model
from dj_rest_auth.registration import serializers as rest_auth_serializers
from rest_framework import serializers

UserModel = get_user_model()


class LoginResponseSerializer(serializers.ModelSerializer):
    """
    Minimal User model w/o password
    """

    avatar = serializers.CharField(source="avatar_url")

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["admin"] = bool(instance.is_superuser or instance.is_staff)
        return ret

    class Meta:
        model = UserModel
        fields = (
            "uid",
            "username",
            "email",
        )
        read_only_fields = (
            "uid",
            "email",
        )


class RegisterSerializer(rest_auth_serializers.RegisterSerializer):
    """Same serializer as rest_auth.registration.serializers.RegisterSerializer w/o password2 field
    remove password2 requirements and validation
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop("password2", None)

    def validate(self, data):
        return data
