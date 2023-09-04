from urllib.parse import urljoin

from django.conf import settings
from django.db import models
from django.db.models.fields.files import FieldFile


class URLToIconModelMixin(models.Model):
    icon: FieldFile

    def url_to_icon(self) -> str | None:
        part = self.icon.url if self.icon else None
        if part is None:
            part = getattr(self, "_DEFAULT_ICON", None)
            if part is not None:
                part = f"{settings.STATIC_URL}{part}"

        return None if part is None else urljoin(settings.PUBLIC_SITE_URL, part)

    class Meta:
        abstract = True
