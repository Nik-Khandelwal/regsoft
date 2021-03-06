# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-25 04:48
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.ASCIIUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=30, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone', models.BigIntegerField(null=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('grp_leader', models.IntegerField(default=0)),
                ('captain', models.IntegerField(default=0)),
                ('coach', models.IntegerField(default=0)),
                ('gender', models.CharField(blank=True, max_length=10, null=True)),
                ('sportid', models.CharField(default='0000000000000000000000000000000000000000', max_length=40)),
                ('confirm1', models.IntegerField(default=0)),
                ('docs', models.FileField(null=True, upload_to='documents/')),
            ],
            options={
                'abstract': False,
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Accomodation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10000)),
                ('strength', models.IntegerField(default=10)),
                ('vacancy', models.IntegerField(default=10)),
            ],
        ),
        migrations.CreateModel(
            name='Accorecnacc',
            fields=[
                ('acco_no', models.IntegerField(primary_key=True, serialize=False)),
                ('accomodation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.Accomodation')),
            ],
        ),
        migrations.CreateModel(
            name='Billcontrols',
            fields=[
                ('bill_no', models.IntegerField(primary_key=True, serialize=False)),
                ('unbilled_amt', models.IntegerField(blank=True, default=0, null=True)),
                ('amt_received', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Controlsystem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recnacc_list_sent', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Enteredplayer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('controls_passed', models.BooleanField(default=False)),
                ('recnacc_passed', models.BooleanField(default=False)),
                ('accorecnacc', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.Accorecnacc')),
                ('billcontrols', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.Billcontrols')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_code', models.CharField(max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='Money',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('twothousand', models.IntegerField()),
                ('fivehundred', models.IntegerField()),
                ('twohundred', models.IntegerField()),
                ('hundred', models.IntegerField()),
                ('fifty', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Regplayer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(blank=True, max_length=10, null=True)),
                ('college', models.CharField(blank=True, max_length=10000000, null=True)),
                ('city', models.CharField(blank=True, max_length=1000000, null=True)),
                ('mobile_no', models.IntegerField(blank=True, null=True, unique=True)),
                ('email_id', models.EmailField(blank=True, max_length=70, null=True, unique=True)),
                ('sport', models.CharField(blank=True, max_length=10000000, null=True)),
                ('entered', models.BooleanField(default=False)),
                ('unbilled_amt', models.IntegerField(default=1000)),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Singleroom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10000)),
                ('vacancy', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Sport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idno', models.IntegerField()),
                ('sport', models.CharField(blank=True, max_length=1000, null=True)),
                ('gender', models.CharField(blank=True, max_length=10, null=True)),
                ('lower', models.IntegerField(default=0)),
                ('upper', models.IntegerField(default=1)),
                ('count', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('college', models.CharField(blank=True, max_length=10000, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('state', models.CharField(blank=True, max_length=30, null=True)),
                ('confirmedsp1', models.CharField(default='0000000000000000000000000000000000000000', max_length=40)),
                ('activate', models.IntegerField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name='enteredplayer',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Group'),
        ),
        migrations.AddField(
            model_name='enteredplayer',
            name='regplayer',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.Regplayer'),
        ),
        migrations.AddField(
            model_name='accorecnacc',
            name='singleroom',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.Singleroom'),
        ),
        migrations.AddField(
            model_name='accomodation',
            name='singleroom',
            field=models.ManyToManyField(blank=True, to='main.Singleroom'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='sport',
            field=models.ManyToManyField(to='main.Sport'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.Team'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
