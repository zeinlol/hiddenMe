from rest_framework import views, permissions, status
from rest_framework.response import Response


class UserDashboardView(views.APIView):
    http_method_names = ["get"]

    permission_classes = (
        permissions.IsAuthenticated,
    )

    @staticmethod
    def get(request, *args, **kwargs):
        chats = []
        for qr_code in request.user.qr_codes.iterator():
            chats.extend(qr_code.chats_set.all())
        return Response({
            "qr_code_amount": request.user.qr_codes.all().count(),
            "messages_amount": request.user.messages_set.all().count(),
            "chats_amount": len(chats),
        },
            status=status.HTTP_200_OK,
        )
