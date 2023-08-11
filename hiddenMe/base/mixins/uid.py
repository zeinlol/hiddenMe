import uuid

import ulid
from django.db import models
from django.utils.translation import gettext_lazy as _

TEXT = "DataBase independent unique identifier"


def uuid_from_ulid() -> uuid.UUID:
    return ulid.microsecond.new().uuid


def get_uuid_based_field(
    null: bool = False,
    editable: bool = False,
    unique: bool = True,
):
    return models.UUIDField(
        default=uuid_from_ulid,
        unique=unique,
        editable=editable,
        null=null,
        help_text=_(TEXT),
    )


class UidAsHelperMixin(models.Model):
    uid = get_uuid_based_field()

    class Meta:
        abstract = True

        #  Don't need index, because "unique=True" create index


class UidAsPrimaryMixin(models.Model):
    uid = models.UUIDField(
        default=uuid_from_ulid,
        unique=True,
        editable=False,
        help_text=_(TEXT),
        primary_key=True,
    )

    class Meta:
        abstract = True
