#from __future__ import unicode_literals
import re
import os

import urllib
#import urllib2 #### uncomment for python 2 #####
from django.conf import settings
from django.contrib import messages

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404,HttpResponseRedirect, JsonResponse
#from .models import CustomUser, Team, Sport
from django.contrib.auth import authenticate, login, logout
from django.contrib import auth
from django.views.generic import View, ListView, FormView
from django.views import generic
from register.forms import LoginForm, TeamForm, PlayerForm
from django.db import IntegrityError
from django.db.models.functions import Lower
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
#from __future__ import unicode_literals
import re

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404,HttpResponseRedirect, JsonResponse
from main.models import CustomUser, Team, Sport
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
from main.models import Group,Regplayer,Enteredplayer,Sport,Controls_user,Firewallz_user,Pcradmin_user,Recnacc_user
import pusher
#from __future__ import unicode_literals
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
#import cStringIO as StringIO
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
from main.models import Group,Regplayer,Enteredplayer,Sport,Money,Billcontrols,Controls_user
from datetime import datetime

from django.contrib.auth import get_user_model
User=get_user_model()
from django.contrib.auth import get_user_model
User=get_user_model()
from django.contrib.auth import get_user_model
User=get_user_model()

pusher_client = pusher.Pusher(
  app_id='551467',
  key='a7ef26b891af0311773e',
  secret='9270c6a4ed1b9cfef8d0',
  cluster='ap2',
  ssl=True
)

#CACHE_TTL = getattr(settings, '#CACHE_TTL', DEFAULT_TIMEOUT)

def is_not_admin(user):
	if user:
		if Controls_user.objects.get(pk=1).user == user or Firewallz_user.objects.get(pk=1).user == user or Pcradmin_user.objects.get(pk=1).user == user or Recnacc_user.objects.get(pk=1).user == user:
			return False
	return True

def test(request):
	return HttpResponse("Working!!!")

def index(request):
	if request.user.is_authenticated():
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.grp_leader==0 and request.user.captain==0:
			return HttpResponseRedirect('/register/register/player/')
		elif request.user.grp_leader==0:
			s=Sport.objects.get(pk=request.user.captain)
			return render(request,'register/index.html/',{'sport_name':s.sport,'sport_id':s.pk,'sport_gender':s.gender})
		return render(request,'register/player.html/')
	else:
		
		return render(request,'register/loginfinal.html/')

def sportlist(request):
	sp=Sport.objects.all().order_by(Lower('sport'))	
	d=[]
	for st in sp:
			s=[]
			s.append(st.idno)
			s.append(st.sport)
			d.append(s)
	tm=Team.objects.all().order_by(Lower('college'))
	d2=[]
	for i in tm:
		s=[]
		s.append(i.college)
		s.append(i.city)
		s.append(i.state)
		s.append(i.pk)
		d2.append(s)

	return JsonResponse({'data':d,'college':d2})

def activate(request,uidb64,token):
	try:
		uid = force_text(urlsafe_base64_decode(uidb64))
		user = User.objects.get(pk=uid)
	except(TypeError, ValueError, OverflowError, User.DoesNotExist):
		user = None
	if user is not None and account_activation_token.check_token(user, token):
		user.is_active = True
		user.save()
		#login(request, user)
		#render page about correspondence
		update_data2 = [8,4]
		pusher_client.trigger('my-channel8', 'my-event8', update_data2)
		update_data3 = [9,2]
		pusher_client.trigger('dashboard-update', 'dashboard-update-event', update_data3)
		return render(request,'register/emailverify.html/')
	else:
		return HttpResponse('Activation link is invalid!')
	if user.is_authenticated():
		return HttpResponseRedirect('/register/')
	else:
		return HttpResponseRedirect('/register/')

def loginuser(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/register/')
	if request.method=='POST':
			data= request.POST
			username = data['Username']
			password = data['Password']
			print(username)
			print(password)
			#up=User.objects.filter(username=username,deleted=0)
			user = auth.authenticate(username=username, password=password)
				
			if user is not None:
				if user.is_active and user.team.activate and user.grp_leader and user.deleted==0:#activation link and pcradmin activation
					login(request,user)
					return HttpResponseRedirect('/register/')
				elif user.is_active and user.team.activate and user.captain and user.deleted==0:
					login(request,user)
					return HttpResponseRedirect('/register/')
				elif user.is_active and user.confirm1 and user.team.activate and user.deleted==0:
					login(request,user)
					return HttpResponseRedirect('/register/')
				else:
					state = "Your account is not active, please wait for further correspondence"
					#return render(request,'register/register.html', {'state':state })
					return render(request,'register/error.html',{'error':state})
				
			else:
				state = "Your username and/or password were incorrect or your account is not activated"
				#return render(request,'register/register.html', {'state':state})
				return render(request,'register/error.html',{'error':state})

def register(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/register/')
	if request.method=='POST': 
		data=json.loads( request.body.decode('utf-8') )
		print(data['college'])
		recaptcha_response = data['captcha']
		url = 'https://www.google.com/recaptcha/api/siteverify'
		values = {
			'secret': '6LcNq10UAAAAAJVLztulO5FzlWynQ6p93k1rLnuk',
			'response': recaptcha_response
		}

		#### uncomment for python 2 #####
		#data2 = urllib.urlencode(values)
		#req = urllib2.Request(url, data2)
		#response = urllib2.urlopen(req)
		#result = json.load(response)
		#################################
		#### comment for python 2 #######
		data2 = urllib.parse.urlencode(values).encode()
		req =  urllib.request.Request(url, data=data2)
		response = urllib.request.urlopen(req)
		result = json.loads(response.read().decode())
		#################################	

		if result['success']:
			pass
		else:
			return JsonResponse({'error': "Invalid CAPTCHA. Please try again."})
		for idno in data['sport_id']:
			sp=Sport.objects.get(pk=int(idno))
			if data['register_as']!='C' and data['gender']!=sp.gender and sp.gender!='both':
				return JsonResponse({'error': 'Selected gender does not fit the gender requirement of the selected sports'})

		team = Team.objects.get(pk=data['college'])
		up=User()
		up.username=data['username']
		up.name=data['name']
		up.set_password(data['password'])
		try:
			up.save()
		except IntegrityError:
			state="Duplicacy in Username"
			return JsonResponse({'error':state})
		if data['register_as']=='C' :
			if len(data['sport_id'])>1:
				return JsonResponse({'error':"coach cannot register in more than 1 sport"})
			else:
				for idno in data['sport_id']:
					sp=Sport.objects.get(pk=idno)
					up.sport.add(sp)
					up.coach=idno
					up.sportid=replaceindex(up.sportid,idno,'1')
		elif data['register_as']=='L' :
			if len(data['sport_id'])>1:
				return JsonResponse({'error':"captain cannot initially register in more than 1 sport"})
			else:
				for idno in data['sport_id']:
					sp=Sport.objects.get(pk=idno)
					up.sport.add(sp)
					up.captain=idno
					up.sportid=replaceindex(up.sportid,idno,'1')
		else:
			for idno in data['sport_id']:
				sp=Sport.objects.get(pk=int(idno))
				up.sport.add(sp)
				up.sportid=replaceindex(up.sportid,int(idno),'1')

		up.phone=data['phone']
		if re.match(r"[^@]+@[^@]+\.[^@]+", data['email'])==None:
			state="Invalid Email Address"
			#return render(request,'register.html',{'state':state})
			return JsonResponse({'error':state})
		up.gender=data['gender']
		up.email=data['email']
		up.grp_leader = 1
		up.team = team
		if team.activate==1:
			up.deleted=1
		up.is_active=False
		up.save()
		to_email = up.email
		current_site = get_current_site(request)
		message = render_to_string('register/msg.html', {
											'user':up, 
											'domain':current_site.domain,
											'uid': urlsafe_base64_encode(force_bytes(up.pk)),
											'token': account_activation_token.make_token(up),
											})
		mail_subject = 'Registration for BOSM \'18'
		#mail.send_mail(mail_subject, message,'f2016226@pilani.bits-pilani.ac.in',[to_email])
		email = EmailMessage(mail_subject, message, to=[to_email])
		email.content_subtype = "html"
		try:
			email.send()
		except:
			return JsonResponse({'error':'activation mail could not be sent please try again'})
		#return HttpResponseRedirect('login/')
		switch_data = [8,4]
		pusher_client.trigger('my-channel8', 'my-event8', switch_data)
		return JsonResponse({'error':'activation mail has been sent. please activate your account and wait for further correspondence'})
	return HttpResponseRedirect('/register/')

def logoutView(request):
	if request.user.is_authenticated():
		pass
	else:
		return HttpResponseRedirect('/register/')
	logout(request)
	return HttpResponseRedirect('/register/')

# def displaysports(request):
# 	if request.user.is_authenticated():
# 		if is_not_admin(request.user):
# 			pass
# 		else:
# 			logout(request)
# 			return HttpResponseRedirect('/register/')
# 	else:
# 		return HttpResponseRedirect('/register/')
# 	user = User.objects.filter(team=request.user.team,deleted=0)
# 	count=[0]*40
# 	for up in user:
# 		for i in Sport.objects.all():
# 			if up.sportid[i.idno]>='1':
# 				count[i.idno]+=1

# 	sports=Sport.objects.all()
# 	for sp in sports:
# 		if count[sp.idno]:
# 			sp.count=count[sp.idno]
# 	data1 = serializers.serialize("json", sports)
# 	return HttpResponse(data1,content_type='application/json')

# def regPlayer(request):
# 	if request.user.is_authenticated():
# 		if is_not_admin(request.user):
# 			pass
# 		else:
# 			logout(request)
# 			return HttpResponseRedirect('/register/')
# 	else:
# 		return HttpResponseRedirect('/register/')
# 	data = json.loads( request.body.decode('utf-8') )
# 	for dt in data['users']:
# 		if dt['captain']:
# 			try:
# 				us=User.objects.get(team= request.user.team,captain=dt['captain'],deleted=0)
# 			except:
# 				pass
# 			else:
# 				return JsonResponse({'error':"captain is already registered in this sport"})
# 		if dt['coach']:
# 			if len(dt['sport_id'])!=1:
# 				return JsonResponse({'error':"coach cannot be participant in other sports"})
# 			try:
# 				us=User.objects.get(team= request.user.team,coach=dt['coach'],deleted=0)
# 			except:
# 				pass
# 			else:
# 				return JsonResponse({'error':"coach is already registered in this sport"})
# 		try:
# 			# u=User.objects.get(team= request.user.team,name=dt['name'], phone=dt['phone'],gender=dt['gender'],deleted=0)
# 			u=User.objects.get(team= request.user.team,phone=dt['phone'],gender=dt['gender'],deleted=0)

# 		except:
# 			pass
# 		else:
# 			if u.coach == dt['coach']:
# 				pass
# 			elif u.coach and dt['coach']:
# 				return JsonResponse({'error':"participant cant be coach in two sports"})
# 			elif u.coach!=0 and dt['coach']	==0:
# 				return JsonResponse({'error':"coach cannot be participant in other sports"})
# 			elif u.coach==0 and dt['coach']!=0:
# 				return JsonResponse({'error':"coach cannot be participant in other sports"})
		
# 		#return render(request,'register.html',{'state':int(dt['captain'])})
# 		#to check any data
# 		try:
# 			up=User.objects.get(team= request.user.team, phone=dt['phone'],coach=0,gender=dt['gender'],deleted=0)
# 			# up=User.objects.get(team= request.user.team,name=dt['name'], phone=dt['phone'],coach=0,gender=dt['gender'],deleted=0)
			
# 		except:
# 			up = User.objects.create(username=(''.join(choice(ascii_uppercase) for i in range(5))),password=request.user.password,deleted=0)
# 			up.username= (''.join(choice(ascii_uppercase) for i in range(5))) + str(up.pk)
# 		#up.username=dt['name'] + str(dt['phone'])
# 			passworduser=(''.join(choice(ascii_uppercase) for i in range(12)))+str(up.pk)
# 			up.set_password(passworduser)
# 			up.name = dt['name']
# 			up.email= dt['email']
# 			to_email = up.email
# 		#current_site = get_current_site(request)
# 			message = render_to_string('register/msg2.html', {
# 											'user':up.name, 
# 											'username':up.username,
# 											'password':passworduser,
											
# 											})
# 			mail_subject = 'Your account details.'
# 			email = EmailMessage(mail_subject, message, to=[to_email])
# 			try:
# 				email.send()
# 			except:
# 				return JsonResponse({'error':'email not sent'})
# 		else:
# 			print('found')
# 			if up.captain ==dt['captain']:
# 				pass
# 			elif up.captain and dt['captain']:
# 				return JsonResponse({'error':"participant cant be captain in two sports"})	

# 		if up.captain==0:
# 			up.captain=	dt['captain']
# 		up.coach = dt['coach']
# 		up.phone= dt['phone']
# 		up.email= dt['email']
# 		up.gender=(dt['gender']).lower()
# 		sports=dt['sport_id']
# 		up.save()
# 		uplist=User.objects.filter(team=request.user.team,coach=0,deleted=0)

# 		for i in sports:#check sport limits
# 			sp=Sport.objects.get(pk=i)
			
# 			count=0
# 			for u in uplist:
# 				if u.sportid[sp.idno]>='1':
# 					count+=1
# 			if count>=sp.upper:
# 				return JsonResponse({'error':"sport limit exceeded in one or more sports"})	

# 		for i in sports:
# 			#if sports[i] =='1':
# 			sp=Sport.objects.get(pk=i)
# 			up.sportid=replaceindex(up.sportid,sp.idno,'1')
				
# 			up.sport.add(sp)
# 		up.team = request.user.team
# 		up.team.activate=1#the participants can login
# 		up.save()	

# 		#pusher starts
# 	update_data3 = [9,2]
# 	pusher_client.trigger('dashboard-update', 'dashboard-update-event', update_data3)
# 	update_data = [7,3]
# 	pusher_client.trigger('my-channel7', 'my-event7', update_data)
# 		#pusher stops

# 	return JsonResponse({})

# def playerlist(request):
# 	if request.user.is_authenticated():
# 		if is_not_admin(request.user):
# 			pass
# 		else:
# 			logout(request)
# 			return HttpResponseRedirect('/register/')
# 	else:
# 		return HttpResponseRedirect('/register/')
# 	data = json.loads(request.body.decode('utf-8'))
# 	idno=int(data['sport_id'])
# 	sp=Sport.objects.get(pk=idno)
# 	user=User.objects.filter(team=request.user.team,deleted=0)
# 	d=[]
# 	for u in user:
# 		if u.sportid[sp.idno]>='1':
# 			s=[]
# 			s.append(u.name)
# 			s.append(u.captain)
# 			s.append(u.pk)
# 			s.append(u.coach)
# 			d.append(s)
# 	data2={'data':d}
# 	return JsonResponse(data2)
# 	#data2 = serializers.serialize("json", user)
# 	#return HttpResponse(data2,content_type='application/json')
# def editPlayer(request):
# 	if request.user.is_authenticated():
# 		if is_not_admin(request.user):
# 			pass
# 		else:
# 			logout(request)
# 			return HttpResponseRedirect('/register/')
# 	else:
# 		return HttpResponseRedirect('/register/')
# 	pass

def playerview(request):
	if request.user.is_authenticated:
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.confirm1>=3:
				return render(request,'register/error.html',{'error':'Your documents have been verified. You cannot upload documents.'})
		if request.method=='POST':
			request.user.docs=request.FILES['filename']
			extension = os.path.splitext(str(request.FILES['filename']))[-1]
			print((request.FILES['filename']).size)
			if (extension == '.pdf' or extension=='.jpg'or extension=='.png') :
				if (request.FILES['filename']).size< 5242880:
					try:
						request.user.save()
					except:
						pass
					else:
						request.user.confirm1=2#documents uploaded
						request.user.save()
						request.user.confirm1=2#documents uploaded
						request.user.save()

						update_data3 = [9,2]
						pusher_client.trigger('dashboard-update', 'dashboard-update-event', update_data3)
						# rp = Regplayer()
						# rp.name = request.user.name
						# rp.gender = request.user.gender
						# rp.college = request.user.team.college
						# rp.city = request.user.team.city
						# rp.mobile_no = request.user.phone
						# rp.email_id = request.user.email
						# rp.sport=''
						# for s in Sport.objects.all():
						# 	if request.user.sportid[s.idno]=='2':
						# 		rp.sport=rp.sport+s.sport+','
						# try:
						# 	rp.save()
						# except:
						# 	pass
				else:
					return render(request,'register/error.html',{'error':'File size has exceeded limit'})
			else:
				return render(request,'register/error.html',{'error':'Incorrect file extension'})

			return HttpResponseRedirect('/register/register/player/')
		else:
			if request.user.confirm1>=1:
				sprt=[]
				splist=Sport.objects.all().order_by('sport')
				for sp in splist:
					if request.user.sportid[sp.idno]>='2':
						sprt.append(sp.sport)
				cl=request.user.team.college+", "+request.user.team.city+", "+request.user.team.state
				return render(request,'register/playerview.html',{'status':request.user.confirm1-1,'username':request.user.username,'name':request.user.name,'college':cl,'sport':sprt,'phone':request.user.phone,'email':request.user.email,'gender':request.user.gender})
			else:
				if request.user.grp_leader or request.user.captain:
					return render(request,'register/error.html',{"error":"you have not been confirmed yet"})
				else:
					return render(request,'register/error2.html',{"error":"you have not been confirmed yet"})
	else:
		return HttpResponseRedirect('/register/')

# def leadersport(request):
# 	sp=Sport.objects.all()
# 	s=[]
# 	for i in sp:
# 		if request.user.sportid[i.idno]>='0':
# 			s.append(i.pk)
# 	return JsonResponse({'data':s})

def replaceindex(text,index=0,replacement=''):
	return '%s%s%s'%(text[:index],replacement,text[index+1:])

# def himesh(request):
# 	return render(request,'register/index.html')
def sendplayerleft(request):
	if request.user.is_authenticated:
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.grp_leader or request.user.captain:
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.deleted!=0:
			logout(request)
			return HttpResponseRedirect('/register/')
	if request.method=='POST':
	# data = json.loads(request.body.decode('utf-8'))
		tm=request.user.team
		ulist=User.objects.filter(team=tm,deleted=0).order_by(Lower('name'))
		slist=Sport.objects.all().order_by(Lower('sport'))
		d=[]
		for u in ulist:
			s=[]
			
			s.append(u.name)
			
			d2=[]
			for sp in slist:
				if u.sportid[sp.idno]>='1':
					d2.append(sp.sport)
			s.append(d2)
			s.append(u.gender)
			s.append(u.pk)
			if u.coach>0:
				s.append(1)
			else:
				s.append(0)
			d.append(s)
		return JsonResponse({'data': d})

def sportlist2(request):
	
	slist=Sport.objects.all().order_by(Lower('sport'))
	d=[]
	for sp in slist:
		s=[]
		s.append(sp.pk)
		s.append(sp.sport)
		s.append(sp.gender)
		d.append(s)
	return JsonResponse({'data': d})

def addplayer(request):
	if request.user.is_authenticated:
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.grp_leader or request.user.captain:
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.deleted!=0:
			logout(request)
			return HttpResponseRedirect('/register/')
	if request.method=='POST':

		tm=request.user.team
		data = json.loads(request.body.decode('utf-8'))
		for dt in data['data']:
			up = User.objects.create(username=(''.join(choice(ascii_uppercase) for i in range(5))),password=request.user.password,deleted=0)
			up.username= (''.join(choice(ascii_uppercase) for i in range(5))) + str(up.pk)
		#up.username=dt['name'] + str(dt['phone'])
			passworduser=(''.join(choice(ascii_uppercase) for i in range(12)))+str(up.pk)
			up.set_password(passworduser)
			up.name = dt['name']
			up.email= dt['email']
			up.phone=dt['phone']
			up.gender=dt['gender']
			up.team=tm
			up.team.activate=1
			try:
				up.save()
			except:
				return JsonResponse({'error':'Participant details could not be saved'})
			to_email = up.email
		#current_site = get_current_site(request)
			message = render_to_string('register/msg2.html', {
											'user':up.name, 
											'username':up.username,
											'password':passworduser,
											
											})
			mail_subject = 'Your account details for BOSM \'18'
			email = EmailMessage(mail_subject, message, to=[to_email])
			email.content_subtype = "html"
			update_data = [7,3]
			pusher_client.trigger('my-channel7', 'my-event7', update_data)
			update_data3 = [9,2]
			pusher_client.trigger('dashboard-update', 'dashboard-update-event', update_data3)
			try:
				email.send()
			except:
				return JsonResponse({'error':'Credentials could not be sent.'})
		return JsonResponse({'success':1})


def sendplayerright(request):
	if request.user.is_authenticated:
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.grp_leader or request.user.captain:
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.deleted!=0:
			logout(request)
			return HttpResponseRedirect('/register/')
	if request.method=='POST':
		data = json.loads(request.body.decode('utf-8'))
		sp1=Sport.objects.get(pk=data['sport_id'])
		slist=Sport.objects.all().order_by(Lower('sport'))
		tm=request.user.team
		ulist=User.objects.filter(team=tm,deleted=0).order_by(Lower('name'))
		d=[]
		for u in ulist:
			if u.sportid[sp1.idno]>='1':
				s=[]
			
				s.append(u.name)
				
				d2=[]
				for sp in slist:
					if u.sportid[sp.idno]>='1':
						d2.append(sp.sport)
				s.append(d2)
				s.append(u.gender)
				s.append(u.pk)
				if u.captain==sp1.pk:
					s.append(1)
				else:
					s.append(0)
				if u.coach==sp1.pk:
					s.append(1)
				else:
					s.append(0)
				d.append(s)
		return JsonResponse({'data': d})

def registerplayer(request):
	if request.user.is_authenticated:
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.grp_leader or request.user.captain:
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.user.deleted!=0:
			logout(request)
			return HttpResponseRedirect('/register/')
	if request.method=='POST':
		data = json.loads(request.body.decode('utf-8'))
		sp=Sport.objects.get(pk=data['sport_id'])
		error=''
		success=1
		uplist=User.objects.filter(team=request.user.team,coach=0,deleted=0)
		count1=0
		count2=0
		for u in uplist:
			if u.sportid[sp.idno]>='1':
				count1+=1
		for dt in data['data']:
			u=User.objects.get(pk=dt['pk'],deleted=0)
			if dt['coach']==0:
				count2+=1
			if dt['captain'] and dt['coach']:
				error=error+('<br>'+u.name+' cannot be both coach and captain in a sport')
				success=0
			if u.coach and dt['coach']:
				error=error+('<br>'+u.name+' cannot be coach in two sports')
				success=0
			if u.captain and dt['captain']:
				error=error+('<br>'+u.name+' cannot be captain in two sports')
				success=0
			try:
				up=User.objects.get(captain=dt['captain'],deleted=0,team=request.user.team)
			except:
				pass
			else:
				error=error+('<br>'+'there cannot be two captains in a sport')
				success=0
			if dt['coach']==0 and u.gender!=sp.gender and sp.gender!='both':
				error=error+('<br>'+u.name+' does not fit the gender requirement of this sport')
				success=0
			if dt['coach']:
				sprtl=Sport.objects.all()
				for sprt in sprtl:
					if u.sportid[sprt.idno]>='1':
						error=error+('<br>'+u.name+' is already registered as a participant and cannot be registered as a coach')
						success=0

		
		if (count1+count2)>sp.upper:
			error=error+'<br>'+'sport limit exceeded. you may register '+str(sp.upper-count1)+' participants in this sport'
			success=0
		if success==0:
			return JsonResponse({'error':error,'success':0})
		success=1	
		error=''
		for dt in data['data']:
			u=User.objects.get(pk=dt['pk'],deleted=0)
			if u.sportid[sp.idno]=='0':
				u.sportid=replaceindex(u.sportid,sp.idno,'1')
				u.sport.add(sp)
				u.captain=dt['captain']
				u.coach=dt['coach']
				try:
					u.save()
				except:
					error=error+('<br>'+u.name+' could not be registered')
					success=0
		if success==1:
			update_data = [7,3]
			pusher_client.trigger('my-channel7', 'my-event7', update_data)
			update_data3 = [9,2]
			pusher_client.trigger('dashboard-update', 'dashboard-update-event', update_data3)
			return JsonResponse({'success':success})
		else:
			return JsonResponse({'success':success,'error':error})
		

def instructions(request):
 	return render(request,'register/instruction.html')
