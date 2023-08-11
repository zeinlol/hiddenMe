from django.db import models
from django.utils.translation import gettext_lazy as _


class TitleDescriptionModelMixin(models.Model):
    """
    An abstract base class model that provides:
    - title
    - description
    """

    title = models.CharField(
        _("Title"),
        max_length=255,
        blank=False,
        null=False,
        default="Title",
    )
    description = models.TextField(
        _("Description"),
        max_length=1000,
        blank=True,
        null=False,
        default="",
    )

    class Meta:
        abstract = True
