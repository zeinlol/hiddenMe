from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from hiddenMe.base.mixins import uuid_from_ulid


class GenerateUlidAsUuidView(APIView):
    http_method_names = ["get"]

    def get(self, request, *args, **kwargs):
        return Response({"ulid": uuid_from_ulid()}, status=status.HTTP_200_OK)
