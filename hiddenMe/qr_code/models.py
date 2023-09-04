from django.db import models

from hiddenMe.account.models import User
from hiddenMe.base.mixins import UidAsPrimaryMixin
from django.utils.translation import gettext_lazy as _

from hiddenMe.base.models.icon_raster_model_mixin import IconRasterModelMixin
from hiddenMe.qr_code.utils.qr_code_generator import generate_qr_code_image


class QRCode(UidAsPrimaryMixin, IconRasterModelMixin, models.Model):
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name=_("qr_codes")
    )

    link = models.TextField(
        verbose_name=_("Value"),
        null=False,
        blank=False,
    )

    def __str__(self) -> str:
        return f"{self.user}: {self.link}"

    def get_qr_core(self):
        if not self.icon:
            self.icon = generate_qr_code_image(value=self.link)
            self.save()
        return self.icon
