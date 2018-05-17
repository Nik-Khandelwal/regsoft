# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
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
from main.models import Group,Regplayer,Enteredplayer,Sport,Money,Billcontrols

from django.contrib.auth import get_user_model
User=get_user_model()

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase, Client
from django.utils import timezone
User=get_user_model()

from main.models import Sport,Team,CustomUser,Regplayer,Group,Billcontrols,Singleroom,Accomodation,Accorecnacc,Enteredplayer,Controlsystem,Money,Acco_name,Recnacc_user,Controls_user,Firewallz_user


class ControlsTestCase(object):
	def setUp(self):
		self.user = User.objects.create_user(username='foo', password='foobar',
											 email='user@test.com', admin_level = 3)
		self.Controls_user = Controls_user.objects.create(user=self.user)
		self.Money = Money.objects.create(twothousand=10,fivehundred=10,twohundred=10,hundred=10,fifty=10)
		self.Team = Team.objects.create(college="Bits Pilani", city="Pilani", state="Rajasthan")
		self.Group = Group.objects.create(group_code="XADC", group_leader=1)
		self.Regplayer = Regplayer.objects.create(name=self.user,gender="male",college=self.Team.college,city=self.Team.city)
		self.Enteredplayer = Enteredplayer.objects.create(regplayer=self.Regplayer, group=self.Group)
		for i in range(0,1001):
			us = User.objects.create_user(username=str(i), password='foobar')
			Regpl = Regplayer.objects.create(name=us,gender="male",college=self.Team.college,city=self.Team.city)
			Grp = Group.objects.create(group_code=str(i), group_leader=1)
			Enteredpl = Enteredplayer.objects.create(regplayer=Regpl, group=Grp)
			bil = Billcontrols.objects.create()

class MainTestCase(ControlsTestCase, TestCase):
	def test_main(self):
		self.client.login(username='foo', password='foobar')
		url = '/controls/'
		response = self.client.get(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		#self.assertTemplateUsed(response, 'controls/index.html')
	
	def test_details(self):
		self.client.login(username='foo', password='foobar')
		url = '/controls/details/'
		response = self.client.get(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)

	def test_create_bill(self):
		self.client.login(username='foo', password='foobar')
		url = '/controls/create_bill/'
		response = self.client.get(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)
		if not response_json.has_key('success'):
			raise RuntimeError("Create_bill failed")

	def test_generate_bill(self):
		self.client.login(username='foo', password='foobar')
		#url = '/controls/create_bill/'
		self.client.login(username='foo', password='foobar')
		send_obj={
		"data": {
			"net_amt": 1000,
			"paid_amt": 2000,
			"deno_2000": 0,
			"deno_500": 4,
			"deno_200": 0,
			"deno_100": 0,
			"deno_50": 0,
			"id_arr": [1, 2, 3, 4, 6, 8, 9, 12, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 39, 40, 42, 44, 45, 46, 47, 49, 50, 51, 52, 53, 54, 56, 57, 59, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74, 76, 77, 78, 79, 82, 84, 85, 86, 88, 90, 91, 93, 94, 95, 96, 97, 99, 101, 103, 104, 105, 106, 107, 109, 110, 113, 114, 116, 117, 118, 119, 120, 121, 123, 125, 126, 127, 128, 129, 130, 132, 133, 134, 135, 136, 137, 138, 139, 141, 148, 149, 150, 151, 153, 154, 156, 157, 161, 163, 166, 167, 169, 172, 173, 174, 175, 177, 179, 180, 181, 182, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 197, 199, 200, 201, 202, 203, 204, 206, 208, 209, 210, 211, 212, 215, 217, 219, 220, 221, 222, 223, 224, 226, 229, 231, 232, 233, 234, 235, 236, 238, 239, 240, 246, 247, 248, 249, 250, 251, 252, 253, 255, 258, 259, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 276, 279, 282, 283, 285, 286, 288, 289, 291, 292, 293, 296, 297, 298, 299, 300, 301, 302, 304, 308, 309, 310, 311, 313, 314, 317, 319, 320, 321, 322, 323, 325, 326, 327, 328, 329, 330, 331, 332, 333, 335, 336, 337, 338, 340, 342, 343, 344, 346, 347, 348, 349, 350, 351, 353, 354, 355, 356, 358, 359, 360, 361, 362, 364, 365, 366, 374, 375, 377, 380, 382, 383, 385, 387, 389, 391, 392, 393, 394, 395, 396, 398, 399, 402, 405, 406, 407, 408, 409, 410, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 428, 429, 430, 432, 433, 434, 436, 437, 438, 439, 441, 442, 443, 444, 445, 449, 451, 452, 453, 454, 457, 458, 459, 460, 461, 462, 463, 464, 466, 467, 468, 470, 471, 472, 473, 474, 475, 476, 478, 479, 480, 481, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 498, 499, 501, 502, 504, 505, 507, 508, 510, 512, 515, 516, 517, 519, 522, 523, 526, 527, 528, 529, 530, 531, 534, 535, 536, 538, 539, 540, 541, 543, 546, 547, 548, 549, 551, 552, 553, 554, 556, 558, 560, 561, 562, 563, 564, 567, 569, 571, 573, 574, 575, 577, 578, 582, 584, 585, 586, 587, 591, 592, 594, 597, 598, 600, 601, 603, 605, 606, 607, 608, 609, 612, 613, 614, 615, 617, 619, 620, 621, 623, 624, 625, 626, 627, 628, 629, 630, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 646, 648, 651, 652, 653, 654, 655, 656, 657, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 679, 680, 681, 683, 686, 687, 688, 689, 690, 691, 694, 696, 697, 698, 700, 701, 703, 704, 707, 708, 709, 711, 712, 713, 714, 715, 716, 717, 719, 722, 723, 724, 725, 727, 728, 729, 730, 731, 733, 734, 735, 736, 741, 742, 743, 744, 745, 746, 747, 748, 751, 753, 754, 755, 756, 758, 759, 760, 761, 763, 764, 766, 767, 768, 769, 770, 771, 773, 775, 776, 777, 778, 779, 780, 783, 785, 786, 788, 789, 790, 791, 792, 793, 795, 796, 797, 798, 799, 801, 803, 804, 805, 806, 808, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 822, 824, 825, 827, 829, 830, 831, 833, 834, 835, 836, 837, 839, 840, 841, 843, 844, 846, 848, 849, 851, 853, 855, 856, 857, 858, 859, 860, 861, 863, 864, 865, 867, 868, 869, 870, 872, 873, 876, 878, 879, 880, 881, 883, 885, 887, 888, 890, 894, 895, 896, 897, 899, 900, 904, 905, 906, 908, 909, 911, 912, 913, 915, 916, 917, 918, 920, 921, 922, 923, 924, 926, 928, 929, 932, 933, 935, 938, 942, 943, 947, 948, 949, 950, 951, 952, 953, 954, 955, 957, 958, 959, 960, 961, 962, 964, 965, 967, 969, 970, 973, 974, 976, 977, 978, 979, 980, 982, 984, 985, 986, 987, 988, 989, 990, 992, 993, 994, 996, 997, 998]
		}
		}
		response = self.client.post('/controls/create_bill/',
								json.dumps(send_obj),
								content_type="application/json")
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)
		if not response_json.has_key('success'):
			raise RuntimeError("Generate_bill failed")
		#print(response_json)


	def test_arpit(self):
		self.client.login(username='foo', password='foobar')
		send_obj={
		"data": {
			"deno_2000": 6,
			"deno_500": 3,
			"deno_200": 3,
			"deno_100": 2,
			"deno_50": 1
		}}
		response = self.client.post('/controls/arpit/',
								json.dumps(send_obj),
								content_type="application/json")
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)
		if not response_json.has_key('success'):
			raise RuntimeError("Arpit failed")
		#print(response_json)

	def test_piyali(self):
		self.client.login(username='foo', password='foobar')
		myObj = {
					"data": {
						"paid_amt": 10000,
						"dd_num": "dfg6tgyg7",
						"id_arr":[1, 2, 3, 4, 6, 8, 9, 12, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 39, 40, 42, 44, 45, 46, 47, 49, 50, 51, 52, 53, 54, 56, 57, 59, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74, 76, 77, 78, 79, 82, 84, 85, 86, 88, 90, 91, 93, 94, 95, 96, 97, 99, 101, 103, 104, 105, 106, 107, 109, 110, 113, 114, 116, 117, 118, 119, 120, 121, 123, 125, 126, 127, 128, 129, 130, 132, 133, 134, 135, 136, 137, 138, 139, 141, 148, 149, 150, 151, 153, 154, 156, 157, 161, 163, 166, 167, 169, 172, 173, 174, 175, 177, 179, 180, 181, 182, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 197, 199, 200, 201, 202, 203, 204, 206, 208, 209, 210, 211, 212, 215, 217, 219, 220, 221, 222, 223, 224, 226, 229, 231, 232, 233, 234, 235, 236, 238, 239, 240, 246, 247, 248, 249, 250, 251, 252, 253, 255, 258, 259, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 276, 279, 282, 283, 285, 286, 288, 289, 291, 292, 293, 296, 297, 298, 299, 300, 301, 302, 304, 308, 309, 310, 311, 313, 314, 317, 319, 320, 321, 322, 323, 325, 326, 327, 328, 329, 330, 331, 332, 333, 335, 336, 337, 338, 340, 342, 343, 344, 346, 347, 348, 349, 350, 351, 353, 354, 355, 356, 358, 359, 360, 361, 362, 364, 365, 366, 374, 375, 377, 380, 382, 383, 385, 387, 389, 391, 392, 393, 394, 395, 396, 398, 399, 402, 405, 406, 407, 408, 409, 410, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 428, 429, 430, 432, 433, 434, 436, 437, 438, 439, 441, 442, 443, 444, 445, 449, 451, 452, 453, 454, 457, 458, 459, 460, 461, 462, 463, 464, 466, 467, 468, 470, 471, 472, 473, 474, 475, 476, 478, 479, 480, 481, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 498, 499, 501, 502, 504, 505, 507, 508, 510, 512, 515, 516, 517, 519, 522, 523, 526, 527, 528, 529, 530, 531, 534, 535, 536, 538, 539, 540, 541, 543, 546, 547, 548, 549, 551, 552, 553, 554, 556, 558, 560, 561, 562, 563, 564, 567, 569, 571, 573, 574, 575, 577, 578, 582, 584, 585, 586, 587, 591, 592, 594, 597, 598, 600, 601, 603, 605, 606, 607, 608, 609, 612, 613, 614, 615, 617, 619, 620, 621, 623, 624, 625, 626, 627, 628, 629, 630, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 646, 648, 651, 652, 653, 654, 655, 656, 657, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 679, 680, 681, 683, 686, 687, 688, 689, 690, 691, 694, 696, 697, 698, 700, 701, 703, 704, 707, 708, 709, 711, 712, 713, 714, 715, 716, 717, 719, 722, 723, 724, 725, 727, 728, 729, 730, 731, 733, 734, 735, 736, 741, 742, 743, 744, 745, 746, 747, 748, 751, 753, 754, 755, 756, 758, 759, 760, 761, 763, 764, 766, 767, 768, 769, 770, 771, 773, 775, 776, 777, 778, 779, 780, 783, 785, 786, 788, 789, 790, 791, 792, 793, 795, 796, 797, 798, 799, 801, 803, 804, 805, 806, 808, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 822, 824, 825, 827, 829, 830, 831, 833, 834, 835, 836, 837, 839, 840, 841, 843, 844, 846, 848, 849, 851, 853, 855, 856, 857, 858, 859, 860, 861, 863, 864, 865, 867, 868, 869, 870, 872, 873, 876, 878, 879, 880, 881, 883, 885, 887, 888, 890, 894, 895, 896, 897, 899, 900, 904, 905, 906, 908, 909, 911, 912, 913, 915, 916, 917, 918, 920, 921, 922, 923, 924, 926, 928, 929, 932, 933, 935, 938, 942, 943, 947, 948, 949, 950, 951, 952, 953, 954, 955, 957, 958, 959, 960, 961, 962, 964, 965, 967, 969, 970, 973, 974, 976, 977, 978, 979, 980, 982, 984, 985, 986, 987, 988, 989, 990, 992, 993, 994, 996, 997, 998]
					}}
		response = self.client.post('/controls/piyali/',
								json.dumps(myObj),
								content_type="application/json")
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)
		if not response_json.has_key('success'):
			raise RuntimeError("Piyali failed")
		#print(response_json)

	def test_unconfirm(self):
		self.client.login(username='foo', password='foobar')
		url = '/controls/unconfirm_grp/'
		response = self.client.get(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)

	def test_unconfirm_details(self):
		self.client.login(username='foo', password='foobar')
		url = '/controls/unconfirm_details/'
		response = self.client.get(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)
		#print(response_json)

	def test_unconfirm_player(self):
		self.client.login(username='foo', password='foobar')
		send_obj={
		"data": {
		  "id_arr": [1, 2, 3, 4, 6, 8, 9, 12, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 39, 40, 42, 44, 45, 46, 47, 49, 50, 51, 52, 53, 54, 56, 57, 59, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74, 76, 77, 78, 79, 82, 84, 85, 86, 88, 90, 91, 93, 94, 95, 96, 97, 99, 101, 103, 104, 105, 106, 107, 109, 110, 113, 114, 116, 117, 118, 119, 120, 121, 123, 125, 126, 127, 128, 129, 130, 132, 133, 134, 135, 136, 137, 138, 139, 141, 148, 149, 150, 151, 153, 154, 156, 157, 161, 163, 166, 167, 169, 172, 173, 174, 175, 177, 179, 180, 181, 182, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 197, 199, 200, 201, 202, 203, 204, 206, 208, 209, 210, 211, 212, 215, 217, 219, 220, 221, 222, 223, 224, 226, 229, 231, 232, 233, 234, 235, 236, 238, 239, 240, 246, 247, 248, 249, 250, 251, 252, 253, 255, 258, 259, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 276, 279, 282, 283, 285, 286, 288, 289, 291, 292, 293, 296, 297, 298, 299, 300, 301, 302, 304, 308, 309, 310, 311, 313, 314, 317, 319, 320, 321, 322, 323, 325, 326, 327, 328, 329, 330, 331, 332, 333, 335, 336, 337, 338, 340, 342, 343, 344, 346, 347, 348, 349, 350, 351, 353, 354, 355, 356, 358, 359, 360, 361, 362, 364, 365, 366, 374, 375, 377, 380, 382, 383, 385, 387, 389, 391, 392, 393, 394, 395, 396, 398, 399, 402, 405, 406, 407, 408, 409, 410, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 428, 429, 430, 432, 433, 434, 436, 437, 438, 439, 441, 442, 443, 444, 445, 449, 451, 452, 453, 454, 457, 458, 459, 460, 461, 462, 463, 464, 466, 467, 468, 470, 471, 472, 473, 474, 475, 476, 478, 479, 480, 481, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 498, 499, 501, 502, 504, 505, 507, 508, 510, 512, 515, 516, 517, 519, 522, 523, 526, 527, 528, 529, 530, 531, 534, 535, 536, 538, 539, 540, 541, 543, 546, 547, 548, 549, 551, 552, 553, 554, 556, 558, 560, 561, 562, 563, 564, 567, 569, 571, 573, 574, 575, 577, 578, 582, 584, 585, 586, 587, 591, 592, 594, 597, 598, 600, 601, 603, 605, 606, 607, 608, 609, 612, 613, 614, 615, 617, 619, 620, 621, 623, 624, 625, 626, 627, 628, 629, 630, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 646, 648, 651, 652, 653, 654, 655, 656, 657, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 679, 680, 681, 683, 686, 687, 688, 689, 690, 691, 694, 696, 697, 698, 700, 701, 703, 704, 707, 708, 709, 711, 712, 713, 714, 715, 716, 717, 719, 722, 723, 724, 725, 727, 728, 729, 730, 731, 733, 734, 735, 736, 741, 742, 743, 744, 745, 746, 747, 748, 751, 753, 754, 755, 756, 758, 759, 760, 761, 763, 764, 766, 767, 768, 769, 770, 771, 773, 775, 776, 777, 778, 779, 780, 783, 785, 786, 788, 789, 790, 791, 792, 793, 795, 796, 797, 798, 799, 801, 803, 804, 805, 806, 808, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 822, 824, 825, 827, 829, 830, 831, 833, 834, 835, 836, 837, 839, 840, 841, 843, 844, 846, 848, 849, 851, 853, 855, 856, 857, 858, 859, 860, 861, 863, 864, 865, 867, 868, 869, 870, 872, 873, 876, 878, 879, 880, 881, 883, 885, 887, 888, 890, 894, 895, 896, 897, 899, 900, 904, 905, 906, 908, 909, 911, 912, 913, 915, 916, 917, 918, 920, 921, 922, 923, 924, 926, 928, 929, 932, 933, 935, 938, 942, 943, 947, 948, 949, 950, 951, 952, 953, 954, 955, 957, 958, 959, 960, 961, 962, 964, 965, 967, 969, 970, 973, 974, 976, 977, 978, 979, 980, 982, 984, 985, 986, 987, 988, 989, 990, 992, 993, 994, 996, 997, 998]
		}}
		response = self.client.post('/controls/unconfirm_player/',
								json.dumps(send_obj),
								content_type="application/json")
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)
		if not response_json.has_key('success'):
			raise RuntimeError("Unconfirm_Player failed")
		#print(response_json)

	def test_view_stats(self):
		self.client.login(username='foo', password='foobar')
		url = '/controls/view_stats/'
		response = self.client.get(url)
		self.client.login(username='foo', password='foobar')
		self.assertEqual(response.status_code, 200)
		response_json = json.loads(response.content)
		#print(response_json)



