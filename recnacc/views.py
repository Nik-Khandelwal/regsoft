from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from main.models import Group,Regplayer,Enteredplayer,Billcontrols,Accorecnacc,Accomodation,Controlsystem,Singleroom,Acco_name
from django.contrib.auth import logout
from django.contrib.auth.models import User
import json
from django.contrib.auth import get_user_model
import string
import random
from django.core import serializers
import pusher
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from main.models import Group,Regplayer,Enteredplayer,Sport,Team
from django.contrib.auth import logout
from django.contrib.auth.models import User
import json
from django.contrib.auth import get_user_model
import string
import random
from django.core import serializers
import pusher
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.template.loader import render_to_string
from io import StringIO
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from cgi import escape
#from weasyprint import HTML
from random import choice
from string import ascii_uppercase
import re
import openpyxl
from openpyxl.utils import get_column_letter
import csv
from django.utils.encoding import smart_str
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404,HttpResponseRedirect, JsonResponse
from main.models import CustomUser, Team
from django.contrib.auth import authenticate, login, logout
from django.contrib import auth
from django.views.generic import View, ListView, FormView
from django.views import generic
from register.forms import LoginForm, TeamForm, PlayerForm
from django.db import IntegrityError
from django.contrib.auth.models import User
import json
from django.core import serializers, mail
from django.contrib.auth.decorators import login_required
from django.dispatch import receiver

from random import choice
from string import ascii_uppercase

from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from register.tokens import account_activation_token
from django.core.mail import EmailMessage
from django.core import serializers
from main.models import Group,Regplayer,Enteredplayer,Sport,Money,Billcontrols,Recnacc_user
from django.contrib.auth import logout

from django.contrib.auth import get_user_model
User=get_user_model()

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


def is_recnacc_admin(user):
	if user:
		if Recnacc_user.objects.get(pk=1).user == user:
			return True
	return False



@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def main(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("main")
			cr = Controlsystem()
			cr.save()
			return render(request,'recnacc/index.html')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def participant_details(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("participant_details")
			data=[]
			for gr in Group.objects.all():
				b=[]
				pl = Enteredplayer.objects.filter(controls_passed=True).filter(group=gr).filter(recnacc_passed=False)
				#print(pl)
				a=[]
				for p in pl:
					a.append(Regplayer.objects.get(pk=p.regplayer_id))
					p.recnacc_displayed = True
					p.save()
					#print(p)
				for t in a:
					b.append({"indiv_name":t.name.name, "indiv_college":t.college, "indiv_gender":t.gender, "indiv_id":t.pk})
				if b:
					data.append({"participants":b,"groupid":gr.group_code})
			#print(data)
			return HttpResponse(json.dumps(data), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')



@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def acco_details(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("acco_details")
			data={}
			b=[]
			for ho in Accomodation.objects.all():
				if 'Single' not in ho.name:
					b.append({"id":ho.pk, "name":ho.name, "no":ho.vacancy})
				else:
					c=[]
					for sr in ho.singleroom.all():
						c.append({"name":sr.name})
					b.append({"id":ho.pk, "name":ho.name, "no":ho.vacancy,"rooms":c})
			data = {"fields":b}
			return HttpResponse(json.dumps(data), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')



@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def srivatsa(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("srivatsa")
			bill = Accorecnacc()
			bill.save()
			dat = {"success":1}
			return HttpResponse(json.dumps(dat), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def satyavrat(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("satyavrat")
			if request.method=='POST':
				data = json.loads( request.body.decode('utf-8') )
				#print(data)
				for i in range(0,int(data['data']['num'])-1):
					bill = Accorecnacc()
					bill.save()
				dat = {"success":1}
				return HttpResponse(json.dumps(dat), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def accomodate(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("accomodate")
			if request.method=='POST':
				data = json.loads( request.body.decode('utf-8') )
				for i in data['data']['id_arr']:
					#print(data['data']['id_arr'])
					rp = Regplayer.objects.get(pk=int(i))
					pl = Enteredplayer.objects.get(regplayer=rp)
					pl.accorecnacc = Accorecnacc.objects.filter(accomodation=None).first()
					pl.recnacc_passed = True
					pl.save()
					dat = {"success":1}
				ac = Accomodation.objects.get(pk=data['data']['bhawan_select'])
				ac.vacancy -= len(data['data']['id_arr'])
				ac.save()
				bill = Accorecnacc.objects.filter(accomodation=None).first()
				bill.accomodation = ac
				bill.save()
				return HttpResponse(json.dumps(dat), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')



@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def accomodate_singleroom(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("accomodate_singleroom")
			if request.method=='POST':
				data = json.loads( request.body.decode('utf-8') )
				for i,j in zip(data['data']['id_arr'], data['data']['bhawan_select']):
					bill = Accorecnacc.objects.filter(accomodation=None).first()
					rp = Regplayer.objects.get(pk=int(i))
					pl = Enteredplayer.objects.get(regplayer=rp)
					sr = Singleroom.objects.get(name=j)
					ac = sr.accomodation_set.all()[0]
					ac.vacancy -= 1
					ac.save()
					bill.singleroom = sr
					bill.save()
					pl.accorecnacc = bill
					pl.recnacc_passed = True
					pl.save()
				dat = {"success":1}
				return HttpResponse(json.dumps(dat), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')



@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def check_updates(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("check_updates")
			data=[]
			for gr in Group.objects.all():
				b=[]
				pl = Enteredplayer.objects.filter(controls_passed=True).filter(group=gr).filter(recnacc_displayed=False)
				a=[]
				for p in pl:
					a.append(Regplayer.objects.get(pk=p.regplayer_id))
					p.recnacc_displayed = True
					p.save()
				for t in a:
					b.append({"indiv_name":t.name.name, "indiv_college":t.college, "indiv_gender":t.gender, "indiv_id":t.pk})
				if b:
					data.append({"participants":b,"groupid":gr.group_code})
			return HttpResponse(json.dumps(data), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@cache_page(CACHE_TTL)
@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def unconfirm_acco(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("unconfirm_acco")
			return render(request,'recnacc/Recn_De_Acc/index.html')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def unconfirm_acco_details(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("unconfirm_acco_details")
			data=[]
			for gr in Group.objects.all():
				b=[]
				pl = Enteredplayer.objects.filter(controls_passed=True).filter(group=gr).filter(recnacc_passed=True).filter(all_done=False)
				#print(pl)
				a=[]
				for p in pl:
					a.append(Regplayer.objects.get(pk=p.regplayer_id))
					p.recnacc_displayed = True
					p.save()
					#print(p)
				for t in a:
					b.append({"indiv_name":t.name.name, "indiv_college":t.college, "indiv_gender":t.gender, "indiv_id":t.pk})
				if b:
					data.append({"participants":b,"groupid":gr.group_code})
				#print(data)
			return HttpResponse(json.dumps(data), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def deaccomodate(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("deaccomodate")
			if request.method=='POST':
				data = json.loads( request.body.decode('utf-8') )
				fine = 0
				for i in data['data']['id_arr']:
					#print(data['data']['id_arr'])
					rp = Regplayer.objects.get(pk=int(i))
					pl = Enteredplayer.objects.get(regplayer=rp)
					pl.all_done = True
					pl.save()
					fine += rp.unbilled_amt
				dat = {"fine":fine}
				return HttpResponse(json.dumps(dat), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')



@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def fine_amount(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("fine_amount")
			if request.method=='POST':
				data = json.loads( request.body.decode('utf-8') )
				for i in data['data']['id_arr']:
					#print(data['data']['id_arr'])
					rp = Regplayer.objects.get(pk=int(i))
					rp.unbilled_amt += data['data']['fine_amount']
					rp.save()
				dat = {"success":1}
				return HttpResponse(json.dumps(dat), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


#def deaccomodate(request):
#	data = json.loads( request.body.decode('utf-8') )
#	for i in data['data']['id_arr']:
#		#print(data['data']['id_arr'])
#		rp = Regplayer.objects.get(pk=int(i))
#		pl = Enteredplayer.objects.get(regplayer=rp)
#		ac = pl.accorecnacc
#		if ac.accomodation is not None:
#			ac.accomodation.vacancy += 1
#			ac.save()
#			pl.accorecnacc = None
#			pl.save()
#		if ac.singleroom is not None:
#			ac.singleroom.vacancy += 1
#			ac.save()
#		pl.recnacc_passed = False
#		pl.save()
#		dat = {"success":1}
#	return HttpResponse(json.dumps(dat), content_type='application/json')

@cache_page(CACHE_TTL)
@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def reconfirm_acco(request):
	print("reconfirm_acco1")
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("reconfirm_acco")
			return render(request,'recnacc/Recn_Re_Acc/index.html')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def reconfirm_acco_details(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("reconfirm_acco_details")
			data=[]
			for gr in Group.objects.all():
				b=[]
				pl = Enteredplayer.objects.filter(controls_passed=True).filter(group=gr).filter(recnacc_passed=True).filter(all_done=False)
				#print(pl)
				a=[]
				for p in pl:
					a.append(Regplayer.objects.get(pk=p.regplayer_id))
					p.recnacc_displayed = True
					p.save()
					#print(p)
				for t in a:
					b.append({"indiv_name":t.name.name, "indiv_college":t.college, "indiv_gender":t.gender, "indiv_id":t.pk})
				if b:
					data.append({"participants":b,"groupid":gr.group_code})
			return HttpResponse(json.dumps(data), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def reaccomodate(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("reaccomodate")
			if request.method=='POST':
				data = json.loads( request.body.decode('utf-8') )
				fine = 0
				for i in data['data']['id_arr']:
					#print(data['data']['id_arr'])
					rp = Regplayer.objects.get(pk=int(i))
					pl = Enteredplayer.objects.get(regplayer=rp)
					pl.accorecnacc = None
					pl.recnacc_passed = False
					pl.save()
				return HttpResponse(json.dumps({"success":1}), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')


@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def passed_stats(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("passed_stats")
			fire_conf = Enteredplayer.objects.all().count()
			cont_conf = Enteredplayer.objects.filter(controls_passed=True).count()
			rec_conf = Enteredplayer.objects.filter(recnacc_passed=True).count()
			data = {"fire_conf":fire_conf,"cont_conf":cont_conf,"rec_conf":rec_conf}
			return HttpResponse(json.dumps(data), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')
 

#var jsonResponse = {"data": [["Ram", ["Common Room", 90, "Single Rooms", 40, "TT Room", 80]],["Budh", ["Common Room", 120, "Single Rooms", 50]],["Meera", ["Common Room", 190, "Single Rooms", 100]],["MAL-A", ["Common Room", 90, "Single Rooms", 20, "TT Room", 10]],["Ram", ["Common Room", 90, "Single Rooms", 40, "TT Room", 80]]]};
@login_required(login_url='/regsoft/')
@user_passes_test(is_recnacc_admin, login_url='/regsoft/')
def availability_stats(request):
	if request.user.is_authenticated():
		if is_recnacc_admin(request.user):
			print("availability_stats")
			data = []
			for ac in Acco_name.objects.all():
				das = []
				das.append(ac.name)
				dat = []
				dat.append("Common Room")
				dat.append(ac.common_room.vacancy)
				dat.append("Single Rooms")
				dat.append(ac.s_room.vacancy)
				dat.append("TT Room")
				dat.append(ac.tt_room.vacancy)
				das.append(dat)
				data.append(das)

			dt = {"data":data}
			return HttpResponse(json.dumps(dt), content_type='application/json')
		else:
			logout(request)
			return HttpResponseRedirect('/regsoft/')
	else:
		return HttpResponseRedirect('/regsoft/')

#var jsonResponse = {"data": [["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]],["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]],["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]],["Ram", [["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]],["Common Room", ["Arpit Anshuman", 1, "Nikhil Khandelwal", 2, "Srivatsa", 3]]]]]};


def view_stats(request):
	print("view_stats")
	data = []
	for ac in Acco_name.objects.all():
		das = []
		das.append(ac.name)
		dat = []
		dt = []
		for pl in Enteredplayer.objects.all():
			try:
				pt = pl.accorecnacc
				if pt.accomodation == ac.common_room:
					dt.append(pl.regplayer.name.name)
					dt.append(pl.regplayer.pk)
					dat.append(dt)
					print(dat)
			except:
				pass		
		das.append(dat)
		data.append

		return HttpResponse(json.dumps({"data":data}), content_type='application/json')

