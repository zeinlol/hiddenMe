from django.db import models

from hiddenMe.account.models import User
from hiddenMe.base.mixins import UidAsPrimaryMixin
from django.utils.translation import gettext_lazy as _

from hiddenMe.base.models.title_description_model_mixin import TitleDescriptionModelMixin
from hiddenMe.qr_code.models import QRCode


class Chat(UidAsPrimaryMixin, TitleDescriptionModelMixin, models.Model):
    qr_code = models.ForeignKey(
        QRCode,
        models.CASCADE,
        to_field="uid",
        related_name=_("chats_set"),
        verbose_name=_("QR Code")
    )

    def __str__(self) -> str:
        return f"{self.qr_code}: {self.title}"
