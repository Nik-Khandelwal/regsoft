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

pusher_client = pusher.Pusher(
  app_id='499153',
  key='9b825df805e0b694cccc',
  secret='f2bbd60c69e36c90a572',
  cluster='ap2',
  ssl=True
)

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

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
			try:
				u=User.objects.get(team=request.user.team, deleted=0,coach=s.idno)
			except:
				coach=False
			else:
				coach=True
			ulist=User.objects.filter(team=request.user.team, deleted=0,coach=0)
			count=0
			for i in ulist:
				if i.sportid[s.idno]>='1':
					count+=1
			return render(request,'register/index.html/',{'SportName':s.sport,'sportid':s.pk,'coach':coach,'lowerlimit':s.lower,'upperlimit':s.upper,'count':count,'gender':s.gender})
		return render(request,'register/player.html/')
	else:
		
		return render(request,'register/login.html/')

def sportlist(request):
	sp=Sport.objects.all()	
	d=[]
	for st in sp:
			s=[]
			s.append(st.idno)
			s.append(st.sport)
			d.append(s)
	tm=Team.objects.filter(activate=0)
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
		return HttpResponseRedirect('/register/')
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
				if user.is_active and user.team.activate and user.grp_leader:#activation link and pcradmin activation
					login(request,user)
					return HttpResponseRedirect('/register/')
				elif user.is_active and user.team.activate and user.captain:
					login(request,user)
					return HttpResponseRedirect('/register/')
				elif user.is_active and user.confirm1 and user.team.activate:
					login(request,user)
					return HttpResponseRedirect('/register/')
				else:
					state = "Your account is not active, please wait for further correspondence"
					#return render(request,'register/register.html', {'state':state })
					return JsonResponse({'error':state})
				
			else:
				state = "Your username and/or password were incorrect or your account is not activated"
				#return render(request,'register/register.html', {'state':state})
				return JsonResponse({'error':state})

def register(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/register/')
	if request.method=='POST': 
		data=json.loads( request.body.decode('utf-8') )

		team = Team.objects.get(pk=data['college'])
		# team.college=data['college']
		# team.city=data['city']
		# team.state=data['state']
		# team.save()
		up=User()
		up.username=data['username']
		up.name=data['name']
		up.set_password(data['password'])
		try:
			up.save()
		except IntegrityError:
			state="Duplicacy in Username"
			#return render(request,'register.html',{'state':state})
			return JsonResponse({'error':state})
		if data['register_as']=='C' :
			if len(data['sport_id'])>1:
				team.delete
				return JsonResponse({'error':"coach cannot register in more than 1 sport"})
			else:
				for idno in data['sport_id']:
					sp=Sport.objects.get(pk=idno)
					up.sport.add(sp)
					up.coach=idno
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
		mail_subject = 'Activate your account.'
		#mail.send_mail(mail_subject, message,'f2016226@pilani.bits-pilani.ac.in',[to_email])
		email = EmailMessage(mail_subject, message, to=[to_email])
		try:
			email.send()
		except:
			return JsonResponse({'error':'activation mail could not be sent please try again'})
		#return HttpResponseRedirect('login/')
		return JsonResponse({'error':'activation mail has been sent. please activate your account and wait for further correspondence'})
	return HttpResponseRedirect('/register/')

def logoutView(request):
	if request.user.is_authenticated():
		pass
	else:
		return HttpResponseRedirect('/register/')
	logout(request)
	return HttpResponseRedirect('/register/')

def displaysports(request):
	if request.user.is_authenticated():
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
	else:
		return HttpResponseRedirect('/register/')
	user = User.objects.filter(team=request.user.team,deleted=0,coach=0)
	count=[0]*40
	for up in user:
		for i in Sport.objects.all():
			if up.sportid[i.idno]>='1':
				count[i.idno]+=1

	sports=Sport.objects.all()
	for sp in sports:
		if count[sp.idno]:
			sp.count=count[sp.idno]
	data1 = serializers.serialize("json", sports)
	return HttpResponse(data1,content_type='application/json')

def regPlayer(request):
	if request.user.is_authenticated():
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
	else:
		return HttpResponseRedirect('/register/')
	data = json.loads( request.body.decode('utf-8') )
	for dt in data['users']:
		try:
			print(dt['gender'])
			u=User.objects.get(team= request.user.team,name=dt['name'], phone=dt['phone'],gender=dt['gender'],deleted=0)

		except:
			pass
		else:
			if u.coach == dt['coach']:
				pass
			elif u.coach and dt['coach']:
				return JsonResponse({'error':"participant cant be coach in two sports"})		
		
		#return render(request,'register.html',{'state':int(dt['captain'])})
		#to check any data
		try:
			up=User.objects.get(team= request.user.team,name=dt['name'], phone=dt['phone'],coach=0,gender=dt['gender'],deleted=0)
			
		except:
			up = User.objects.create(username=(''.join(choice(ascii_uppercase) for i in range(5))),password=request.user.password,deleted=0)
			up.username= (''.join(choice(ascii_uppercase) for i in range(5))) + str(up.pk)
		#up.username=dt['name'] + str(dt['phone'])
			passworduser=(''.join(choice(ascii_uppercase) for i in range(12)))+str(up.pk)
			up.set_password(passworduser)
			up.name = dt['name']
			up.email= dt['email']
			to_email = up.email
		#current_site = get_current_site(request)
			message = render_to_string('register/msg2.html', {
											'user':up.name, 
											'username':up.username,
											'password':passworduser,
											
											})
			mail_subject = 'Your account details.'
			email = EmailMessage(mail_subject, message, to=[to_email])
			try:
				email.send()
			except:
				return JsonResponse({'error':'email not sent'})
		else:
			print('found')
			if up.captain ==dt['captain']:
				pass
			elif up.captain and dt['captain']:
				return JsonResponse({'error':"participant cant be captain in two sports"})	

		if up.captain==0:
			up.captain=	dt['captain']
		up.coach = dt['coach']
		up.phone= dt['phone']
		up.email= dt['email']
		up.gender=(dt['gender']).lower()
		sports=dt['sport_id']
		#for i in range(40):
		for i in sports:
			#if sports[i] =='1':
			sp=Sport.objects.get(pk=i)
			up.sportid=replaceindex(up.sportid,sp.idno,'1')
				
			up.sport.add(sp)
		up.team = request.user.team
		up.team.activate=1#the participants can login
		up.save()

		#pusher starts
	update_data = [7,3]
	pusher_client.trigger('my-channel7', 'my-event7', update_data)
		#pusher stops

	return JsonResponse({})

def playerlist(request):
	if request.user.is_authenticated():
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
	else:
		return HttpResponseRedirect('/register/')
	data = json.loads(request.body.decode('utf-8'))
	idno=int(data['sport_id'])
	sp=Sport.objects.get(pk=idno)
	user=User.objects.filter(team=request.user.team,sport=sp,deleted=0)
	d=[]
	for u in user:
		s=[]
		s.append(u.name)
		s.append(u.captain)
		s.append(u.pk)
		s.append(u.coach)
		d.append(s)
	data2={'data':d}
	return JsonResponse(data2)
	#data2 = serializers.serialize("json", user)
	#return HttpResponse(data2,content_type='application/json')

def editPlayer(request):
	if request.user.is_authenticated():
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
	else:
		return HttpResponseRedirect('/register/')
	data = json.loads(request.body.decode('utf-8'))

	# if request.user.username == data['newname']+request.user.team.code:
	# 	state="name of participant cannot be changed to that of logged in User"
	# 	return JsonResponse({'error':state})
	up1=User.objects.get(pk=int(data['pk']),deleted=0)
	if up1.captain or up1.coach or up1.grp_leader:
		state="name of captain, coach or group leader cannot be edited"
		return JsonResponse({'error':state})
	try:
		up2=User.objects.get(team=request.user.team,name=data['newname'],phone=up1.phone,deleted=0)
		#if there exists another player with same name as the newname 
		#then the person cud be same person or cud be different person
		#if same person then phn no will be same then we merge the details 
		#else we donot merge the details we just change the details
	except:
		up1.name = data['newname']
		up1.save()

	else:
		if up2==request.user or up2.grp_leader or up2.captain or up.coach:
			return JsonResponse({'error':'you cannot change user to logged in user or grpleader or captain or coach'})
		up1.name = up2.name
		for i in up2.sport.all():
			#if up2.sportid[i] =='1':
				up1.sportid=replaceindex(up1.sportid,i.idno,'1')
				sp=Sport.objects.get(pk=i.idno)
				up1.sport.add(sp)
		up1.captain=up2.captain
		up1.coach=up2.coach
		up1.grp_leader=up2.grp_leader

		
		try:
			up1.save()
		except:
			state="Duplicacy in details"
			#return HttpResponseRedirect('3/error/')
			return JsonResponse({'error':state})
		else:
			up2.delete()
			to_email = up1.email
			#current_site = get_current_site(request)
			passworduser=(''.join(choice(ascii_uppercase) for i in range(12)))+str(up1.pk)
			up1.set_password(passworduser)
			message = render_to_string('register/msg2.html', {
											'user':up1.name, 
											'username':up1.username,
											'password':passworduser,
											
											})
			mail_subject = 'Your new account details.'
			#mail.send_mail(mail_subject, message,'f2016226@pilani.bits-pilani.ac.in',[to_email])
			email = EmailMessage(mail_subject, message, to=[to_email])
			email.send()
	#up1.save()

	return JsonResponse({})

def playerview(request):
	if request.user.is_authenticated:
		if is_not_admin(request.user):
			pass
		else:
			logout(request)
			return HttpResponseRedirect('/register/')
		if request.method=='POST':
			request.user.docs=request.FILES['filename']
			try:
				request.user.save()
			except:
				pass
			else:
				request.user.confirm1=2#documents uploaded
				request.user.save()
				request.user.confirm1=2#documents uploaded
				request.user.save()
				u12 = User.objects.get(pk=request.user.pk)
				rp = Regplayer()
				rp.name = u12
				rp.gender = request.user.gender
				rp.college = request.user.team.college
				rp.city = request.user.team.city
				rp.mobile_no = request.user.phone
				rp.email_id = request.user.email
				rp.sport=''
				for s in Sport.objects.all():
					if request.user.sportid[s.idno]=='2':
						rp.sport=rp.sport+s.sport+','
				try:
					rp.save()
				except:
					pass
			return HttpResponseRedirect('/register/register/player/')
		else:
			return render(request,'register/playerview.html',{'status':request.user.confirm1-1,'name':request.user.name})
	else:
		return HttpResponseRedirect('/register/')

def leadersport(request):
	sp=Sport.objects.all()
	s=[]
	for i in sp:
		if request.user.sportid[i.idno]>='0':
			s.append(i.pk)
	return JsonResponse({'data':s})

def replaceindex(text,index=0,replacement=''):
	return '%s%s%s'%(text[:index],replacement,text[index+1:])

def himesh(request):
	return render(request,'register/index.html')