from django.conf.urls import url
from register.views import *
from django.conf import settings
from register.views import *
from pcradmin.views import *
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$',index),

    url(r'^displaylimits/$', displaySp),
    url(r'^displaylimits/change/$', changeLimit),

    url(r'^addsport/$', addSp),
    url(r'^addcollege/$', addTeam),

    url(r'^mail/$',render_pcrmail),
    url(r'^mail/modify/$',modify_pcrmail),
    url(r'^mail/send/$',send),
    url(r'^mail/send/modify/$',modify_pcrmail),

    url(r'^documents/$',render_pcrmail),
    url(r'^documents/team/$',docurl),
    url(r'^documents/approve/$',docapprove),

    url(r'^credential/$',credleader),
    url(r'^credential/display/$',credplayers),
    url(r'^credential/display/send/$',sendcred),
    url(r'^delete/$',delete),
    url(r'^logout/$',logoutView),

    url(r'^confirmationmail/$',finalmail),
    # url(r'^finalmail/sendcaptain/modify/$',modify_pcrfinal),

    url(r'^changeleader/$',credleader),
    url(r'^changeleader/send/$',changeleader),
    url(r'^changeleader/send/change/$',changegl),

    url(r'^activate/$',viewGrpLeaders),
    url(r'^activate/activate/$',activateGrp),
    url(r'^activate/deactivate/$',deactivateGrp),

    url(r'^excel/$',excelDisplay),
    url(r'^excel/leaderexcel/$',leaderExcel),
    url(r'^excel/leadercsv/$',leaderCsv),
    url(r'^excel/leaderpdf/$',leaderPdf),
    url(r'^download_excel/(?P<pk>[0-9]+)/$',createExcel),
    url(r'^download_csv/(?P<pk>[0-9]+)/$',createCsv),
    url(r'^download_pdf/(?P<pk>[0-9]+)/$',createPdf),

    url(r'^stats/$',stats),
    url(r'^stats/college/',statscollege),
    url(r'^stats/specific/',statscollegesport),
    url(r'^stats/sport/',statssport),

    url(r'^confirm/$',confirmTeamDetails),
    url(r'^confirm/team/',confirmTeamDisplay),
    url(r'^confirmteam/$',confirmTeam),
    url(r'^unconfirm/$',unconfirmTeam),

    url(r'^edit/$',editDisplay),
    url(r'^edit/team/$',editDetails),
    url(r'^edit/team/modify/$',editName), 

    url(r'^dashboard/$',dashboard), 
    
    url(r'^paymentdetails/$',paydetails), 
    url(r'^refresh/$',refresh), 
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
