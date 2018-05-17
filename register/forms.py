from django.contrib.auth.models import User
from django import forms
from .models import *

class TeamForm(forms.Form):
	college = forms.CharField(max_length=50,label='Name (Team name):')
	password = forms.CharField(widget=forms.PasswordInput(),max_length=50)
	name = forms.CharField(max_length=50,label='Name of Participant :')
	phone = forms.IntegerField(widget=forms.TextInput(),min_value=6000000000,label='Phone of Participant :')
	email = forms.EmailField(label='Email of Participant :')
	captain = forms.IntegerField(widget=forms.TextInput(),min_value=0,label='enter 1 if captain else 0:')
	age = forms.IntegerField(widget=forms.TextInput(),label='Age of Participant :')

class PlayerForm(forms.Form):
	name = forms.CharField(max_length=50,label='Name of Participant :')
	phone = forms.IntegerField(widget=forms.TextInput(),min_value=6000000000,label='Phone of Participant :')
	email = forms.EmailField(label='Email of Participant :')
	captain = forms.IntegerField(widget=forms.TextInput(),min_value=0,label='enter 1 if captain :')
	age = forms.IntegerField(widget=forms.TextInput(),label='Age of Participant :')

class LoginForm(forms.Form):
	name = forms.CharField(max_length = 50)
	password = forms.CharField(widget=forms.PasswordInput())
