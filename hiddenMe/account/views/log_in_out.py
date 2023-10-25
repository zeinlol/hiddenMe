from dj_rest_auth import views as rest_auth_views
from django.contrib.auth import user_logged_out, get_user_model, user_logged_in
from rest_framework import permissions, status, views
from rest_framework.response import Response

from hiddenMe.account import serializers

User = get_user_model()


class LoginView(rest_auth_views.LoginView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    # noinspection PyMethodMayBeStatic
    def post(self, request):
        # noinspection PyProtectedMember
        request._auth.delete()
        user_logged_out.send(sender=request.user.__class__, request=request, user=request.user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class LogoutAllView(rest_auth_views.LogoutView):
    """
    Logout all user sessions
    I.E. deletes all auth tokens for the user
    """

    permission_classes = (permissions.IsAuthenticated,)

    def logout(self, request):
        request.user.auth_token_set.all().delete()
        request.user.user_device_set.all().delete()
        user_logged_out.send(
            sender=request.user.__class__, request=request, user=request.user, action="user.kill_all_sessions"
        )
        return Response(None, status=status.HTTP_204_NO_CONTENT)
