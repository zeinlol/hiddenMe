from django.db import models
from django.utils.translation import gettext_lazy as _

from hiddenMe.base.utils import get_path_to_file_with_extension
from .url_to_icon_mixin import URLToIconModelMixin


class IconRasterModelMixin(URLToIconModelMixin):
    """
    An abstract base class model that provides:
    - icon
    """

    icon = models.ImageField(
        _("icon"),
        max_length=255,
        upload_to=get_path_to_file_with_extension,
        blank=True,
        null=True,
    )

    class Meta:
        abstract = True
