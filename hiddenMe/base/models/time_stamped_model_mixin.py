from django.db import models
from django.utils.translation import gettext_lazy as _

from model_utils.fields import AutoCreatedField, AutoLastModifiedField


class TimeStampedModelMixin(models.Model):
    """
    An abstract base class model that provides self-updating
    ``created_at`` and ``modified_at`` fields.

    """

    created_at = AutoCreatedField(_("created at"))
    modified_at = AutoLastModifiedField(_("modified at"))

    class Meta:
        abstract = True
