# Generated by Django 5.2.1 on 2025-05-31 02:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_roomchat_chatmessanges_delete_chat'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='roomchat',
            name='usuario_creator',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='creador_del_roomchat', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
