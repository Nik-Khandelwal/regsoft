#from __future__ import unicode_literals
import re

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404,HttpResponseRedirect, JsonResponse
from main.models import CustomUser, Team
from django.contrib.auth import authenticate, login, logout
from django.contrib import auth
from django.views.generic import View, ListView, FormView
from django.views import generic
from .forms import LoginForm
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
from main.models import Group,Regplayer,Enteredplayer,Sport

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
from main.models import Group,Regplayer,Enteredplayer,Sport,Money,Billcontrols,Controls_user

from django.contrib.auth import get_user_model
User=get_user_model()

from django.contrib.auth import get_user_model
User=get_user_model()


def dispreglogin(request):
	return render(request, 'main/login.html')


def regloginuser(request):
	if request.method=='POST':
			data= request.POST
			username = data['username']
			password = data['password']
			up=User.objects.filter(username=username)
			user = auth.authenticate(username=username, password=password)
				
			if user is not None:
				if user.is_active and user.admin_level == 1:#activation link and pcradmin activation
					login(request,user)
					return HttpResponseRedirect('/pcradmin/')
				elif user.is_active and user.admin_level == 2:#activation link and pcradmin activation
					login(request,user)
					return HttpResponseRedirect('/firewallz/')
				elif user.is_active and user.admin_level == 3:#activation link and pcradmin activation
					login(request,user)
					return HttpResponseRedirect('/controls/')
				elif user.is_active and user.admin_level == 4:#activation link and pcradmin activation
					login(request,user)
					return HttpResponseRedirect('/recnacc/')
				else:
					state = "Your username and/or password were incorrect"
					#return render(request,'register/register.html', {'state':state })
					return JsonResponse({'error':state})
				
			else:
				state = "Your username and/or password were incorrect or your account is not activated"
				#return render(request,'register/register.html', {'state':state})
				return JsonResponse({'error':state})


def regsoft_logout(request):
	logout(request)
	return HttpResponseRedirect('/')


def team_list(request):
	dat = []
	for t in Team.objects.all():
		dat.append({"college":t.college,"pk":t.pk})
	return JsonResponse({"data":dat})
