from django.contrib.auth import get_user_model
from rest_framework import views, permissions, generics

from hiddenMe.account import serializers

User = get_user_model()


class UserView(generics.RetrieveAPIView):
    """
    Reads minimal current user information
    Accepts GET method.
    """

    serializer_class = serializers.UserDataSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_object(self):
        return self.request.user


class UserGeneralInfoView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        serializer = serializers.UserDataSerializer(instance=request.user, context={"request": self.request})
        return serializer.data
