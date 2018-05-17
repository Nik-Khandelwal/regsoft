from django.conf.urls import url
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
	url(r'^$', dispreglogin),
	url(r'^regloginuser/$', regloginuser, name='login_con'),
	url(r'^regsoft_logout/$', regsoft_logout, name='regsoft_logout'),


]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
