# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-08-31 08:46
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_auto_20180725_1117'),
    ]

    operations = [
        migrations.CreateModel(
            name='Amounts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('amount', models.IntegerField(default=0)),
                ('deactivate', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='PaytmHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.IntegerField()),
                ('ORDERID', models.CharField(max_length=30, verbose_name='ORDER ID')),
                ('TXNDATE', models.DateTimeField(default=django.utils.timezone.now, verbose_name='TXN DATE')),
                ('TXNID', models.IntegerField(verbose_name='TXN ID')),
                ('BANKTXNID', models.IntegerField(blank=True, null=True, verbose_name='BANK TXN ID')),
                ('BANKNAME', models.CharField(blank=True, max_length=50, null=True, verbose_name='BANK NAME')),
                ('RESPCODE', models.IntegerField(verbose_name='RESP CODE')),
                ('PAYMENTMODE', models.CharField(blank=True, max_length=10, null=True, verbose_name='PAYMENT MODE')),
                ('CURRENCY', models.CharField(blank=True, max_length=4, null=True, verbose_name='CURRENCY')),
                ('GATEWAYNAME', models.CharField(blank=True, max_length=30, null=True, verbose_name='GATEWAY NAME')),
                ('MID', models.CharField(max_length=40)),
                ('RESPMSG', models.TextField(max_length=250, verbose_name='RESP MSG')),
                ('TXNAMOUNT', models.FloatField(verbose_name='TXN AMOUNT')),
                ('STATUS', models.CharField(max_length=12, verbose_name='STATUS')),
            ],
        ),
       # migrations.AddField(
        #    model_name='customuser',
         #   name='orderid1',
          #  field=models.CharField(blank=True, max_length=10, null=True),
       # ),
#        migrations.AddField(
 #           model_name='customuser',
  #          name='orderid2',
   #         field=models.CharField(blank=True, max_length=10, null=True),
    #    ),
     #   migrations.AddField(
      #      model_name='customuser',
       #     name='orderid3',
#            field=models.CharField(blank=True, max_length=10, null=True),
 #       ),
  #      migrations.AddField(
   #         model_name='customuser',
    #        name='pay1',
     #       field=models.IntegerField(default=0),
      #  ),
       # migrations.AddField(
        #    model_name='customuser',
         #   name='pay2',
          #  field=models.IntegerField(default=0),
   #     ),
    #    migrations.AddField(
     #       model_name='customuser',
      #      name='pay3',
      #      field=models.IntegerField(default=0),
      #  ),
       # migrations.AddField(
        #    model_name='customuser',
         #   name='pcramt',
          #  field=models.IntegerField(default=0),
       # ),
    ]