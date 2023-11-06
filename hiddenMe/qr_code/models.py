from io import BytesIO

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.utils.translation import gettext_lazy as _
from qrcode.image.pil import PilImage

from hiddenMe.account.models import User
from hiddenMe.base.mixins import UidAsPrimaryMixin
from hiddenMe.base.models.icon_raster_model_mixin import IconRasterModelMixin
from hiddenMe.base.models.title_description_model_mixin import TitleDescriptionModelMixin
from hiddenMe.qr_code.utils.qr_code_generator import generate_qr_code_image


class QRCode(UidAsPrimaryMixin, TitleDescriptionModelMixin, IconRasterModelMixin, models.Model):
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

    def get_link(self):
        return f"{settings.PUBLIC_SITE_URL}qr-codes/{self.uid}/new-chat/"

    def __str__(self) -> str:
        return f"{self.user}: {self.link}"

    def get_qr_core(self):
        if not self.icon:

            qr_code: PilImage = generate_qr_code_image(value=self.get_link())
            image_io = BytesIO()
            qr_code.save(image_io, format='PNG')
            image_io.seek(0)
            image_file = InMemoryUploadedFile(
                image_io, None, 'image.png', 'image/png', image_io.tell(), None
            )
            image_file.seek(0)

            self.icon.save('new_image.png', image_file)
            self.save()
        return self.icon
