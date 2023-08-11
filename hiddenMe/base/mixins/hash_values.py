from django.db import models
from django.utils.translation import gettext_lazy as _


class HashValuesMixin(models.Model):
    # [hash]-[BEGIN]
    hash_name: str = models.CharField(
        _("Hash name"),
        max_length=10,
        blank=False,
        null=False,
        editable=False,
    )
    hash_digest: bytes | memoryview = models.BinaryField(
        _("Hash digest"),
        max_length=64,
        blank=False,
        null=False,
        editable=False,
    )

    @property
    def hash(self) -> str:
        return f"{self.hash_name}: {self.hash_digest.hex()}"

    # [hash]-[END]

    class Meta:
        abstract = True


class HashValuesTempMixin(models.Model):
    # [hash]-[BEGIN]
    hash_name: str = models.CharField(
        _("Hash name"),
        max_length=10,
        blank=True,
        null=True,
        editable=True,
        default=None,
    )
    hash_digest: bytes | memoryview = models.BinaryField(
        _("Hash digest"),
        max_length=64,
        blank=True,
        null=True,
        editable=True,
        default=None,
    )

    @property
    def hash(self) -> str:
        return f"{self.hash_name}: {self.hash_digest.hex()}"

    # [hash]-[END]

    class Meta:
        abstract = True
