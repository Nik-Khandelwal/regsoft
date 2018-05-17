
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

from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from register.tokens import account_activation_token
from django.core.mail import EmailMessage
from django.core import serializers
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import get_user_model
User=get_user_model()

from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from main.models import Group,Regplayer,Enteredplayer
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

import re

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
from main.models import Group,Regplayer,Enteredplayer,Sport

from django.contrib.auth import get_user_model
User=get_user_model()


def name_generator(size=5, chars=string.ascii_uppercase + string.digits):
	str = ''.join(random.choice(chars) for _ in range(size))
	for grp in User.objects.all():
		if grp.username == str:
			str = name_generator()
	return str


def replaceindex(text,index=0,replacement=''):
    return '%s%s%s'%(text[:index],replacement,text[index+1:])

array = ['Abbott',
  'Acevedo',
  'Acosta',
  'Adams',
  'Adkins',
  'Aguilar',
  'Aguirre',
  'Albert',
  'Alexander',
  'Alford',
  'Allen',
  'Allison',
  'Alston',
  'Alvarado',
  'Alvarez',
  'Anderson',
  'Andrews',
  'Anthony',
  'Armstrong',
  'Arnold',
  'Ashley',
  'Atkins',
  'Atkinson',
  'Austin',
  'Avery',
  'Avila',
  'Ayala',
  'Ayers',
  'Bailey',
  'Baird',
  'Baker',
  'Baldwin',
  'Ball',
  'Ballard',
  'Banks',
  'Barber',
  'Barker',
  'Barlow',
  'Barnes',
  'Barnett',
  'Barr',
  'Barrera',
  'Barrett',
  'Barron',
  'Barry',
  'Bartlett',
  'Barton',
  'Bass',
  'Bates',
  'Battle',
  'Bauer',
  'Baxter',
  'Beach',
  'Bean',
  'Beard',
  'Beasley',
  'Beck',
  'Becker',
  'Bell',
  'Bender',
  'Benjamin',
  'Bennett',
  'Benson',
  'Bentley',
  'Benton',
  'Berg',
  'Berger',
  'Bernard',
  'Berry',
  'Best',
  'Bird',
  'Bishop',
  'Black',
  'Blackburn',
  'Blackwell',
  'Blair',
  'Blake',
  'Blanchard',
  'Blankenship',
  'Blevins',
  'Bolton',
  'Bond',
  'Bonner',
  'Booker',
  'Boone',
  'Booth',
  'Bowen',
  'Bowers',
  'Bowman',
  'Boyd',
  'Boyer',
  'Boyle',
  'Bradford',
  'Bradley',
  'Bradshaw',
  'Brady',
  'Branch',
  'Bray',
  'Brennan',
  'Brewer',
  'Bridges',
  'Briggs',
  'Bright',
  'Britt',
  'Brock',
  'Brooks',
  'Brown',
  'Browning',
  'Bruce',
  'Bryan',
  'Bryant',
  'Buchanan',
  'Buck',
  'Buckley',
  'Buckner',
  'Bullock',
  'Burch',
  'Burgess',
  'Burke',
  'Burks',
  'Burnett',
  'Burns',
  'Burris',
  'Burt',
  'Burton',
  'Bush',
  'Butler',
  'Byers',
  'Byrd',
  'Cabrera',
  'Cain',
  'Calderon',
  'Caldwell',
  'Calhoun',
  'Callahan',
  'Camacho',
  'Cameron',
  'Campbell',
  'Campos',
  'Cannon',
  'Cantrell',
  'Cantu',
  'Cardenas',
  'Carey',
  'Carlson',
  'Carney',
  'Carpenter',
  'Carr',
  'Carrillo',
  'Carroll',
  'Carson',
  'Carter',
  'Carver',
  'Case',
  'Casey',
  'Cash',
  'Castaneda',
  'Castillo',
  'Castro',
  'Cervantes',
  'Chambers',
  'Chan',
  'Chandler',
  'Chaney',
  'Chang',
  'Chapman',
  'Charles',
  'Chase',
  'Chavez',
  'Chen',
  'Cherry',
  'Christensen',
  'Christian',
  'Church',
  'Clark',
  'Clarke',
  'Clay',
  'Clayton',
  'Clements',
  'Clemons',
  'Cleveland',
  'Cline',
  'Cobb',
  'Cochran',
  'Coffey',
  'Cohen',
  'Cole',
  'Coleman',
  'Collier',
  'Collins',
  'Colon',
  'Combs',
  'Compton',
  'Conley',
  'Conner',
  'Conrad',
  'Contreras',
  'Conway',
  'Cook',
  'Cooke',
  'Cooley',
  'Cooper',
  'Copeland',
  'Cortez',
  'Cote',
  'Cotton',
  'Cox',
  'Craft',
  'Craig',
  'Crane',
  'Crawford',
  'Crosby',
  'Cross',
  'Cruz',
  'Cummings',
  'Cunningham',
  'Curry',
  'Curtis',
  'Dale',
  'Dalton',
  'Daniel',
  'Daniels',
  'Daugherty',
  'Davenport',
  'David',
  'Davidson']


for i in range(0,60):
  us = User()
  us.username = array[i+90]
  us.set_password(array[i+90]+"007")
  us.name = array[i+90]
  us.confirm1 = 2
  us.sportid = replaceindex(us.sportid,i%4,'2')
  us.gender = "Male"
  us.team = Team.objects.get(pk=(18+i%5))
  us.save()
  rp = Regplayer()
  rp.name = us
  rp.gender = us.gender
  rp.college = us.team.college
  rp.city = us.team.city
  rp.sport=''
  for s in Sport.objects.all():
  	if us.sportid[s.idno]=='2':
  		rp.sport=rp.sport+s.sport+','
  rp.save()
