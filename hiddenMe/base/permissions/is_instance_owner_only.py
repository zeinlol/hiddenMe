from rest_framework import permissions


class IsInstanceOwnerOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.is_staff:
            return True
        return request.user == obj.user
