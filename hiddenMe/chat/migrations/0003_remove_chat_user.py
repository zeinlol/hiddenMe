# Generated by Django 4.2.6 on 2023-11-07 01:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='user',
        ),
    ]
