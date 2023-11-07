from django.db import models

from hiddenMe.base.mixins import UidAsPrimaryMixin
from django.utils.translation import gettext_lazy as _

from hiddenMe.base.models.time_stamped_model_mixin import TimeStampedModelMixin
from hiddenMe.chat.models import Chat
from hiddenMe.account.models import User


class Message(UidAsPrimaryMixin, TimeStampedModelMixin, models.Model):
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        null=True,
        blank=False,
        related_name=_("messages_set")
    )
    chat = models.ForeignKey(
        Chat,
        models.CASCADE,
        to_field="uid",
        related_name=_("messages_set"),
        verbose_name=_("Chat")
    )
    text = models.TextField(
        _("Message text"),
        max_length=1000,
        blank=True,
        null=False,
        default="",
    )

    def __str__(self) -> str:
        return f"{self.chat.uid}: {self.uid}"
