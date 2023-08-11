from rest_framework import permissions


class IsSuperUserOrStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_superuser or request.user.is_staff)
