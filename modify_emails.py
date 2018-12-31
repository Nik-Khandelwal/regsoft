from main import models

for player in models.Regplayer.objects.exclude(email_id=None):
    tempemail = player.email_id
    print (tempemail)
    tempemail +='xyz'
    player.email_id = tempemail
    player.save()
    print (tempemail)