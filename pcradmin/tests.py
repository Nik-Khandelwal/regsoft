
#from __future__ import unicode_literals
import re

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404,HttpResponseRedirect, JsonResponse
from main.models import CustomUser, Team, Sport,Pcradmin_user
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

from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string

from register.tokens import account_activation_token
from django.core.mail import EmailMessage
from django.core import serializers

from random import choice
from string import ascii_uppercase

from io import StringIO
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.template import Context

from django.contrib.auth import get_user_model
User=get_user_model()
from django.test import TestCase,Client

def replaceindex(text,index=0,replacement=''):
    return '%s%s%s'%(text[:index],replacement,text[index+1:])

# Create your tests here.
class PcradminTestCase(object):
	def setUp(self):
		self.user = User.objects.create_user(username='foo', password='foobar',
                                             email='user@test.com')
		self.Pcradmin_user = Pcradmin_user.objects.create(user=self.user)

		for i in range(5):
			sp=Sport.objects.create(sport='sport'+str(i+1),gender='female',lower=1,upper=10)

		for i in range(100):
			tm=Team.objects.create(college=('college'+str(i+1)),city='city',state='state',activate=1)
			gl=User.objects.create(team=tm,username=(str(i+11100)+str(tm.pk)),password='foobar',name='gl'+str(i+1),phone=9999999999,email='f2016226@pilani.bits-pilani.ac.in',grp_leader=1,gender='female')
			splist=Sport.objects.all()
			for sp in splist:
				gl.sportid=replaceindex(gl.sportid,sp.idno,'1')
			gl.save()
			for j in range(10):
				pl=User.objects.create(team=tm,username=(str(j+1)+str(tm.pk)),password='foobar',name='pl'+str(j+1),phone=9999999999,email='f2016226@pilani.bits-pilani.ac.in',gender='female')
				for sp in splist:
					pl.sportid=replaceindex(pl.sportid,sp.idno,'1')
				pl.save()

		for i in range(100):
			tm=Team.objects.create(college=('college'+str(i+130)),city='city',state='state',activate=0)
			gl=User.objects.create(team=tm,username=(str(i+19930)+str(tm.pk)),password='foobar',name='gl'+str(i+26),phone=9999999999,email='f2016226@pilani.bits-pilani.ac.in',grp_leader=1,gender='female')
			splist=Sport.objects.all()
			for sp in splist:
				gl.sportid=replaceindex(gl.sportid,sp.idno,'1')
			gl.save()
			for j in range(10):
				pl=User.objects.create(team=tm,username=(str(j+11130)+str(tm.pk)),password='foobar',name='pl'+str(j+26),phone=9999999999,email='f2016226@pilani.bits-pilani.ac.in',gender='female')
				for sp in splist:
					pl.sportid=replaceindex(pl.sportid,sp.idno,'1')
				pl.save()

class MainTestCase(PcradminTestCase, TestCase):
	def test_index(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/'
		response = self.client.get(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)

	def test_render_pcrmail(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/mail/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_modify_pcrmail(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/mail/modify/'
		send_obj = {
			'email_arr': ['f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in','f2016226@pilani.bits-pilani.ac.in'],
			'sub': 'subject',
			'body':'email body'
		}
		response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))
		if not response_json['success']:
			raise RuntimeError("mails couldnot be sent")

	def test_send(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/mail/send/'
		tmlist=Team.objects.all()
		for tm in tmlist:
			send_obj={'clg_id':tm.pk}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))

	def test_activateGrp(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/activate/activate/'
		tmlist=Team.objects.filter(activate=0)
		for tm in tmlist:
			if tm.activate==0:
				gl=User.objects.get(team=tm,grp_leader=1,deleted=0)
				send_obj={'pk':gl.pk}
				response = self.client.post(url,json.dumps(send_obj),
									content_type="application/json")
				self.assertEqual(response.status_code, 200)
				response_json = json.loads(response.content.decode('utf-8'))
				if not response_json['success']:
					raise RuntimeError("grp leaders couldnot be activated")

	def test_deactivateGrp(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/activate/deactivate/'
		tmlist=Team.objects.filter(activate=1)
		for tm in tmlist:
			if tm.activate==1:
				gl=User.objects.get(team=tm,grp_leader=1,deleted=0)
				send_obj={'pk':gl.pk}
				response = self.client.post(url,json.dumps(send_obj),
									content_type="application/json")
				self.assertEqual(response.status_code, 200)
				response_json = json.loads(response.content.decode('utf-8'))
				if not response_json['success']:
					raise RuntimeError("grp leaders couldnot be deactivated")

	def test_viewGrpLeaders(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/activate/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_displaySp(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/displaylimits/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_changeLimit(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/displaylimits/change/'
		splist=Sport.objects.all()
		for s in splist:
			send_obj={'idno':s.pk,'lowerLimit':2,'upperLimit':15}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))
			if not response_json['success']:
				raise RuntimeError("sport limits couldnot be changed")

	def test_addSp(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/addsport/'
		send_obj={'sportName':'newsport','lowerLimit':2,'upperLimit':15,'gender':'male'}
		response = self.client.post(url,json.dumps(send_obj),
							content_type="application/json")
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))
		if not response_json['success']:
			raise RuntimeError("sport couldnot be added")

	def test_statssport(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/stats/sport/'
		splist=Sport.objects.all()
		for s in splist:
			send_obj={'idno':s.pk}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))
	
	def test_statscollege(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/stats/college/'
		splist=Team.objects.filter(activate=1)
		for s in splist:
			send_obj={'idno':s.pk}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))

	def test_stats(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/stats/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_statscollegesport(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/stats/specific/'
		splist=Sport.objects.all()
		tmlist=Team.objects.filter(activate=1)
		for s in splist:
			for tm in tmlist:
				send_obj={'sport_id':s.pk,'col_id':tm.pk}
				response = self.client.post(url,json.dumps(send_obj),
									content_type="application/json")
				self.assertEqual(response.status_code, 200)
				response_json = json.loads(response.content.decode('utf-8'))

	def test_editDisplay(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/edit/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_editDetails(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/edit/team/'
		splist=Team.objects.filter(activate=1)
		for s in splist:
			send_obj={'clg_id':s.pk}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))

	def test_editName(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/edit/team/modify/'
		tmlist=Team.objects.filter(activate=1)
		uplist=User.objects.filter(deleted=0)
		splist=Sport.objects.all()
		for tm in tmlist:
			uplist=User.objects.filter(deleted=0,team=tm)
			for up in uplist:
				d=[]
				for s in splist:
					d.append(str(s.pk))
				send_obj={'idno':up.pk,'selectedSports':d,'email':'f2016250@pilani.bits-pilani.ac.in','gender':'male','phone':88888888,'name':up.name+str('changed')}
				response = self.client.post(url,json.dumps(send_obj),
									content_type="application/json")
				self.assertEqual(response.status_code, 200)
				response_json = json.loads(response.content.decode('utf-8'))
				if not response_json['success']:
					raise RuntimeError("players couldnot be edited")

	def test_confirmTeamDetails(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/confirm/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_confirmTeamDisplay(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/confirm/team/'
		splist=Team.objects.filter(activate=1)
		for s in splist:
			send_obj={'clg_id':s.pk}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))

	def test_confirmTeam(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/confirmteam/'
		uplist=Team.objects.filter(activate=1)
		splist=Sport.objects.all()
		for up in uplist:
			d=[]
			for s in splist:
				d.append((s.pk))
			send_obj={'clg_id':up.pk,'id_arr':d}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))
			if not response_json['success']:
				raise RuntimeError("teams couldnot be confirmed")

	def test_unconfirmTeam(self):
		pass

	def test_credleader(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/credential/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_credplayers(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/credential/display/'
		splist=Team.objects.filter(activate=1)
		for s in splist:
			send_obj={'clg_id':s.pk}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))

	def test_sendcred(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/credential/display/send/'
		splist=Team.objects.filter(activate=1)
		for s in splist:
			d=[]
			uplist=User.objects.filter(team=s,grp_leader=0)
			for i in uplist:
				d.append(i.pk)
				send_obj={'id_arr':d}
				response = self.client.post(url,json.dumps(send_obj),
									content_type="application/json")
				self.assertEqual(response.status_code, 200)
				response_json = json.loads(response.content.decode('utf-8'))
				if not response_json['success']:
					raise RuntimeError("credentials couldnot be sent")

	def test_changeleader(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/changeleader/'
		splist=Team.objects.filter(activate=1)
		for s in splist:
			send_obj={'idno':s.pk}
			response = self.client.post(url,json.dumps(send_obj),
								content_type="application/json")
			self.assertEqual(response.status_code, 200)
			response_json = json.loads(response.content.decode('utf-8'))

	def test_changegl(self):
		pass

	def test_dashboard(self):
		self.client.login(username='foo', password='foobar')
		url = '/pcradmin/dashboard/'
		response = self.client.post(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content.decode('utf-8'))

	def test_delete(self):
		pass
