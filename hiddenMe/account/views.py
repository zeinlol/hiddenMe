
from rest_framework import views, permissions, status
from allauth.account.utils import complete_signup
from dj_rest_auth import views as rest_auth_views
from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.registration import views as registration_views
from django.contrib.auth import user_logged_out, get_user_model
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from hiddenMe.account.serializers import LoginResponseSerializer

User = get_user_model()

class UserView(RetrieveAPIView):
    """
    Reads minimal current user information
    Accepts GET method.
    """

    serializer_class = LoginResponseSerializer
    permission_classes = (
        IsAuthenticated,
        # TokenHasReadWriteScope,
    )

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        """
        Adding this method since it is sometimes called when using
        django-rest-swagger
        https://github.com/Tivix/django-rest-auth/issues/275
        """
        return get_user_model().objects.none()

class RegisterView(registration_views.RegisterView):
    permission_classes = (AllowAny, )

    def get_response_data(self, user):
        serializer = LoginResponseSerializer(instance=user, context={"request": self.request})
        return serializer.data

    def perform_create(self, serializer):
        user = serializer.save(self.request)

        api_settings.TOKEN_CREATOR(self.token_model, user, serializer)

        # noinspection PyProtectedMember,PyUnresolvedReferences
        complete_signup(
            self.request._request,
            user,
            # allauth_settings.EMAIL_VERIFICATION,
            "none",
            None,
        )
        return user


class LoginView(rest_auth_views.LoginView):
    permission_classes = (AllowAny,)
    authentication_classes = ()


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    # noinspection PyMethodMayBeStatic
    def post(self, request):
        # noinspection PyProtectedMember
        request._auth.delete()
        user_logged_out.send(sender=request.user.__class__, request=request, user=request.user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class LogoutAllView(APIView):
    """
    Logout all user sessions
    I.E. deletes all auth tokens for the user
    """

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        request.user.auth_token_set.all().delete()
        request.user.user_device_set.all().delete()
        user_logged_out.send(
            sender=request.user.__class__, request=request, user=request.user, action="user.kill_all_sessions"
        )
        return Response(None, status=status.HTTP_204_NO_CONTENT)

class UserGeneralInfoView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        serializer = LoginResponseSerializer(instance=request.user, context={"request": self.request})
        return serializer.data