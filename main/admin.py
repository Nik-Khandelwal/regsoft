# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Regplayer,Group,Enteredplayer,Pcradmin_user,Firewallz_user,Controls_user,Recnacc_user,Controlsystem,Acco_name,Accorecnacc,Accomodation,Singleroom,Billcontrols,Money, Sport,Team,CustomUser

admin.site.register(Regplayer)
admin.site.register(Enteredplayer)
admin.site.register(Group)
admin.site.register(Billcontrols)
admin.site.register(Acco_name)
admin.site.register(Singleroom)
admin.site.register(Accomodation)
admin.site.register(Accorecnacc)
admin.site.register(Controlsystem)
admin.site.register(Sport)
admin.site.register(Team)
admin.site.register(CustomUser)
admin.site.register(Money)
admin.site.register(Recnacc_user)
admin.site.register(Controls_user)
admin.site.register(Firewallz_user)
admin.site.register(Pcradmin_user)