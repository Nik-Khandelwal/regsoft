# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Regplayer,Group,Enteredplayer,Pcradmin_user,Firewallz_user,Controls_user,Recnacc_user,Controlsystem,Acco_name,Accorecnacc,Accomodation,Singleroom,Billcontrols,Money, Sport,Team,CustomUser
from import_export import resources
from import_export.admin import ImportExportModelAdmin
#admin.site.register(Regplayer)
@admin.register(Regplayer)
class RegplayerAdmin(ImportExportModelAdmin):
    pass
#admin.site.register(Enteredplayer)
@admin.register(Enteredplayer)
class EnteredplayerAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Group)
@admin.register(Group)
class GroupAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Billcontrols)
@admin.register(Billcontrols)
class BillcontrolsAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Acco_name)
@admin.register(Acco_name)
class Acco_nameAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Singleroom)
@admin.register(Singleroom)
class SingleroomAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Accomodation)
@admin.register(Accomodation)
class AccomodationAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Accorecnacc)
@admin.register(Accorecnacc)
class AccorecnaccAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Controlsystem)
@admin.register(Controlsystem)
class ControlsystemAdmin(ImportExportModelAdmin):
    pass
#admin.site.register(Sport)
#admin.site.register(Team)
#admin.site.register(CustomUser)
# admin.site.register(Money)
@admin.register(Money)
class MoneyAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Recnacc_user)
@admin.register(Recnacc_user)
class Recnacc_userAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Controls_user)
@admin.register(Controls_user)
class Controls_userAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Firewallz_user)
@admin.register(Firewallz_user)
class Firewallz_userAdmin(ImportExportModelAdmin):
    pass
# admin.site.register(Pcradmin_user)
@admin.register(Pcradmin_user)
class Pcradmin_userAdmin(ImportExportModelAdmin):
    pass
@admin.register(Team)
class TeamAdmin(ImportExportModelAdmin):
    pass

@admin.register(Sport)
class SportAdmin(ImportExportModelAdmin):
    pass

@admin.register(CustomUser)
class CustomUserAdmin(ImportExportModelAdmin):
    pass
