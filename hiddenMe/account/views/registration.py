from dj_rest_auth.registration import views as registration_views
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from hiddenMe.account import serializers

User = get_user_model()


class RegisterView(registration_views.RegisterView):

    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        serializer = serializers.RegisterSerializer(instance=user, context={"request": self.request})
        return Response(serializer.data, status=201, headers=headers)

    def perform_create(self, serializer):
        return serializer.save(request=self.request)
