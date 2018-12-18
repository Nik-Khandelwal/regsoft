"""regsoft URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
#import debug_toolbar
from .import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^firewallz/', include('firewallz.urls')),
    url(r'^controls/', include('controls.urls')),
    url(r'^recnacc/', include('recnacc.urls')),
    url(r'^register/', include('register.urls')),
    url(r'^pcradmin/',include('pcradmin.urls')),
    url(r'^regsoft/',include('main.urls')),
 #   url(r'^__debug__/', include(debug_toolbar.urls)),
    url(r'^adminpanels/',views.adminpanels,name='adminpanels'),
    url(r'^$', views.main),
#    url(r'^loaderio-95d5988255f245b1c030872bd19be2ec/', views.tet),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
