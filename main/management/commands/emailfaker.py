from main import models
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help : "change email_id from 'abc@xyz.com' to 'abc@xyz.comxyz'"

    def handle(self, *args, **options):
        for player in models.Regplayer.objects.exclude(email_id=None):
            tempemail = player.email_id
            print (tempemail)
            tempemail +='xyz'
            player.email_id = tempemail
            player.save()
            print (tempemail)
