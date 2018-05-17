from django.contrib.auth.models import User
from django import forms
from .models import *

class LoginForm(forms.Form):
	name = forms.CharField(max_length = 50)
	password = forms.CharField(widget=forms.PasswordInput())