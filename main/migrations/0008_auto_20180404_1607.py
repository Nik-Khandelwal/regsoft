# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-04-04 16:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_customuser_admin_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='billcontrols',
            name='dd_no',
            field=models.CharField(blank=True, max_length=100000, null=True),
        ),
        migrations.AddField(
            model_name='group',
            name='group_leader',
            field=models.IntegerField(default=0),
        ),
    ]
