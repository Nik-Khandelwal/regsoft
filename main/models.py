# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from smartfields import fields
from django.utils import timezone
import datetime

# Create your models here.
class Sport(models.Model):
	idno = models.IntegerField(primary_key=True)
	sport= models.CharField(max_length=1000, null=True, blank=True)
	gender = models.CharField(max_length=10, null=True, blank=True)
	lower = models.IntegerField(default=0)
	upper = models.IntegerField(default=1)
	count = models.IntegerField(default=0)
	
	def __str__(self):
		return str(self.idno) + self.sport

class Team(models.Model):#one team from one college
	college = models.CharField(max_length=10000, null=True, blank=True)
	city = models.CharField(max_length=100, null=True, blank=True)
	state = models.CharField(max_length=30, null=True, blank=True)
	confirmedsp1 = models.CharField(max_length=40, default="0000000000000000000000000000000000000000")
	#confirmedsp1=models.ManyToManyField(Sport)
	activate=models.IntegerField(default=0)
	
	def __str__(self):
		return self.college

class CustomUser(AbstractUser):#extending user model
	phone=models.BigIntegerField(null=True)
	name = models.CharField(max_length=100, null=True, blank=True)
	#admin (if belongs to native departments or not)
	admin_level = models.IntegerField(default=0)
	grp_leader = models.IntegerField(default=0)
	captain = models.IntegerField(default=0)
	coach = models.IntegerField(default=0)
	gender = models.CharField(max_length=10, null=True, blank=True)
	team = models.ForeignKey(Team,null=True, on_delete=models.CASCADE)
	sportid = models.CharField(max_length=40, default="0000000000000000000000000000000000000000")
	#confirmed1 = models.CharField(max_length=40, default="0000000000000000000000000000000000000000")
	#confirmed1=models.ManyToManyField(Sport)
	#0 will be 1 for those sports for which the participant has registered 2 for confirmed
	confirm1=models.IntegerField(default=0)#1 for confirmed 2 for documents 4 all done
	sport=models.ManyToManyField(Sport)
	docs=fields.FileField(upload_to="documents/",null=True,blank=True)
	docs2=fields.FileField(upload_to="documents/",null=True,blank=True)
	deleted=models.IntegerField(default=0)
	pcramt=models.IntegerField(default=0)
	
	pay1=models.IntegerField(default=0)#1 for prereg, 2 for reg, 3 reg to prereg
	pay2=models.IntegerField(default=0)
	pay3=models.IntegerField(default=0)
	orderid1=models.CharField(max_length=10, null=True, blank=True)
	orderid2=models.CharField(max_length=10, null=True, blank=True)
	orderid3=models.CharField(max_length=10, null=True, blank=True)
	def __str__(self):
		return self.username


class Regplayer(models.Model):
	name = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
	#name = models.CharField(max_length=100, null=True, blank=True)
	gender = models.CharField(max_length=10, null=True, blank=True)
	college = models.CharField(max_length=10000000, null=True, blank=True)
	city = models.CharField(max_length=1000000, null=True, blank=True)
	mobile_no = models.IntegerField(null=True, blank=True)
	email_id = models.EmailField(max_length=70, null=True, blank=True)
	sport = models.CharField(max_length=10000000, null=True, blank=True)
	entered = models.BooleanField(default=False)
	unbilled_amt = models.IntegerField(default=1100)
	fine = models.FloatField(default=0)
	notes = models.CharField(max_length=10000, null=True, blank=True)
	blood_grp = models.CharField(max_length=100,null=True,blank=True)
	uid = models.CharField(max_length=100,default="18CB0000")

	def __str__(self):
		return self.name.name
	

class Group(models.Model):
	group_code = models.CharField(max_length = 6)
	group_leader = models.IntegerField(default=0)
	def __str__(self):
		return self.group_code


class Billcontrols(models.Model):
	bill_no = models.IntegerField(primary_key = True)
	dd_no = models.CharField(max_length=100000, blank=True, null=True)
	unbilled_amt = models.IntegerField(default=0,null=True, blank=True)
	amt_received = models.IntegerField(null=True, blank=True)

	def __str__(self):
		return str(self.bill_no)


class Singleroom(models.Model):
	name = models.CharField(max_length=10000)
	vacancy = models.IntegerField(default=1)

	def __str__(self):
		return self.name


class Accomodation(models.Model):
	name = models.CharField(max_length=10000)
	mf = models.CharField(max_length=10, default="male")
	fine = models.FloatField(default=0)
	strength = models.IntegerField(default=10)
	vacancy = models.IntegerField(default=10)
	singleroom = models.ManyToManyField(Singleroom, blank=True)

	def __str__(self):
		return self.name


class Accorecnacc(models.Model):
	acco_no = models.IntegerField(primary_key=True)
	accomodation = models.ForeignKey(Accomodation, on_delete=models.CASCADE, null=True, blank=True)
	singleroom = models.ForeignKey(Singleroom,on_delete=models.CASCADE,null=True, blank=True)

	def __str__(self):
		return str(self.acco_no)


class Enteredplayer(models.Model):
	regplayer = models.OneToOneField(Regplayer, null=True)
	group = models.ForeignKey(Group, on_delete=models.CASCADE)
	controls_passed = models.BooleanField(default = False)
	recnacc_passed = models.BooleanField(default = False)
	controls_displayed = models.BooleanField(default=False)
	recnacc_displayed = models.BooleanField(default=False)
	billcontrols = models.ForeignKey(Billcontrols, on_delete=models.CASCADE, null=True, blank=True)
	accorecnacc = models.ForeignKey(Accorecnacc, on_delete=models.CASCADE, null=True, blank=True)
	all_done = models.BooleanField(default = False)

	def __str__(self):
		return self.regplayer.name.name


class Controlsystem(models.Model):
	recnacc_list_sent = models.IntegerField(default=0)

	def __str__(self):
		return str(self.recnacc_list_sent)


class Money(models.Model):
	twothousand = models.IntegerField(null=True, default=0)
	fivehundred = models.IntegerField(null=True, default=0)
	twohundred = models.IntegerField(null=True, default=0)
	hundred = models.IntegerField(null=True, default=0)
	fifty = models.IntegerField(null=True, default=0)

	@property
	def total(self):
		return int(self.twothousand*2000+self.fivehundred*500+self.twohundred*200+self.hundred*100+self.fifty*50)


class Acco_name(models.Model):
	name = models.CharField(max_length=1000)
	common_room = models.OneToOneField(Accomodation, null=True, blank=True, related_name="common_room")
	tt_room = models.OneToOneField(Accomodation, null=True, blank=True, related_name="tt_room")
	s_room = models.OneToOneField(Accomodation, null=True, blank=True, related_name="s_room")

	def __str__(self):
		return str(self.name)

class Recnacc_user(models.Model):
	user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class Controls_user(models.Model):
	user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class Firewallz_user(models.Model):
	user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class Pcradmin_user(models.Model):
	user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Note(models.Model):
	text = models.TextField()
	time = models.DateTimeField(auto_now=True)
	
class Amounts(models.Model):
	name = models.CharField(max_length=10)#pre and reg
	amount=models.IntegerField(default=0)
	deactivate=models.IntegerField(default=0)
	def __str__(self):
		return self.name

class PaytmHistory(models.Model):
	user = models.IntegerField()
	ORDERID = models.CharField('ORDER ID', max_length=100)
	TXNDATE = models.DateTimeField('TXN DATE', default=timezone.now)
	TXNID = models.CharField('TXN ID', max_length=100)
	BANKTXNID = models.CharField('BANK TXN ID', null=True, blank=True, max_length=100)
	BANKNAME = models.CharField('BANK NAME', max_length=100, null=True, blank=True)
	RESPCODE = models.CharField('RESP CODE', max_length=100, null=True, blank=True)
	PAYMENTMODE = models.CharField('PAYMENT MODE', max_length=100, null=True, blank=True)
	CURRENCY = models.CharField('CURRENCY', max_length=100, null=True, blank=True)
	GATEWAYNAME = models.CharField("GATEWAY NAME", max_length=100, null=True, blank=True)
	MID = models.CharField(max_length=100)
	RESPMSG = models.TextField('RESP MSG', max_length=1000)
	TXNAMOUNT = models.FloatField('TXN AMOUNT')
	STATUS = models.CharField('STATUS', max_length=100)
	def __str__(self):
		return self.ORDERID+','+str(self.TXNID)
	#user = models.IntegerField()
	#ORDERID = models.CharField('ORDER ID', max_length=30)
	#TXNDATE = models.DateTimeField('TXN DATE', default=timezone.now)
	#TXNID = models.IntegerField('TXN ID')
	#BANKTXNID = models.IntegerField('BANK TXN ID', null=True, blank=True)
	#BANKNAME = models.CharField('BANK NAME', max_length=50, null=True, blank=True)
	#RESPCODE = models.IntegerField('RESP CODE')
	#PAYMENTMODE = models.CharField('PAYMENT MODE', max_length=10, null=True, blank=True)
	#CURRENCY = models.CharField('CURRENCY', max_length=4, null=True, blank=True)
	#GATEWAYNAME = models.CharField("GATEWAY NAME", max_length=30, null=True, blank=True)
	#MID = models.CharField(max_length=40)
	#RESPMSG = models.TextField('RESP MSG', max_length=250)
	#TXNAMOUNT = models.FloatField('TXN AMOUNT')
	#STATUS = models.CharField('STATUS', max_length=12)
	#def __str__(self):
	#	return self.ORDERID+','+str(self.TXNID)

