# Generated by Django 4.2.6 on 2023-10-12 23:21

from django.db import migrations, models
import hiddenMe.base.mixins.uid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('uid', models.UUIDField(default=hiddenMe.base.mixins.uid.uuid_from_ulid, editable=False, help_text='DataBase independent unique identifier', primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(default='Title', max_length=255, verbose_name='Title')),
                ('description', models.TextField(blank=True, default='', max_length=1000, verbose_name='Description')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
