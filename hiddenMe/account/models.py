from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from hiddenMe.base.mixins import UidAsPrimaryMixin


class User(UidAsPrimaryMixin, AbstractUser):
    email = models.EmailField(_("email address"), unique=True)

    phone_number = models.CharField(_("phone number"), max_length=15, blank=True, null=True)

    @property
    def name(self):
        return self.get_full_name()

    def __str__(self):
        return self.username

    def get_absolute_url(self) -> str:
        return reverse("users:detail", kwargs={"pk": self.pk})

    def get_full_name(self):
        if not self.first_name and not self.last_name:
            return self.username.strip()
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_name(self) -> str:
        return self.get_full_name()
