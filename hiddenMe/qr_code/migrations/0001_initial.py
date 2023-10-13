# Generated by Django 4.2.6 on 2023-10-12 23:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import hiddenMe.base.mixins.uid
import hiddenMe.base.utils.get_path_to_file_field_adaptive_constructor


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='QRCode',
            fields=[
                ('uid', models.UUIDField(default=hiddenMe.base.mixins.uid.uuid_from_ulid, editable=False, help_text='DataBase independent unique identifier', primary_key=True, serialize=False, unique=True)),
                ('icon', models.ImageField(blank=True, max_length=255, null=True, upload_to=hiddenMe.base.utils.get_path_to_file_field_adaptive_constructor.get_path_to_file_with_extension, verbose_name='icon')),
                ('link', models.TextField(verbose_name='Value')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='qr_codes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]