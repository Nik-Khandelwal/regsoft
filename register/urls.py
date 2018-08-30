from django.conf.urls import url
from register.views import *
from django.conf import settings
from register.views import *
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
	url(r'^$',index),
    	url(r'^register/$', register),
    	url(r'^register/player/$', playerview),
    #url(r'^register/change/$',changeLimit),
	url(r'^login/$', loginuser),
	url(r'^logout/$',logoutView),
	url(r'^add/$',addplayer),
	url(r'^submit/$',registerplayer),
	#url(r'^display/$',displaysports),
	url(r'^playerlist/$',sendplayerleft),
	#url(r'^leadersport/$',leadersport),
	url(r'^sportlist/$',sportlist),
	url(r'^sport/$',sportlist2),
	url(r'^show/$',sendplayerright),
	#url(r'^edit/(?P<number>[0-9]+)/error/$',error),
	#url(r'^add/(?P<number>[0-9]+)/error/$',error),
	url(r'^instructions/$', instructions),
	url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',activate, name='activate'),
	url(r'^paytm/payment/', getpay),
    	url(r'^paytm/response/', response),
	
	
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
