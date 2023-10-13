from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hiddenMe.account'
    label = "hidden_me_account"
    verbose_name = _("Accounts")
