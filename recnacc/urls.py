from django.conf.urls import url
from .import views

app_name = 'recnacc'

urlpatterns = [

    url(r'^$',views.main, name='main'),

    url(r'^participant_details/$',views.participant_details, name='participant_details'),

    url(r'^acco_details/$',views.acco_details, name='acco_details'),

    url(r'^accomodate/$',views.accomodate,name='accomodate'),

    url(r'^unconfirm_acco_details/$',views.unconfirm_acco_details,name='unconfirm_acco_details'),

    url(r'^deaccomodate/$',views.deaccomodate,name='deaccomodate'),

    url(r'^unconfirm_acco/$',views.unconfirm_acco,name='unconfirm_acco'),

    url(r'^reconfirm_acco/$',views.reconfirm_acco,name='reconfirm_acco'),

    url(r'^reconfirm_acco_details/$',views.reconfirm_acco_details,name='reconfirm_acco_details'),

    url(r'^reaccomodate/$',views.reaccomodate,name='reaccomodate'),

    url(r'^fine_amount/$',views.fine_amount,name='fine_amount'),    

    url(r'^srivatsa/$',views.srivatsa,name='srivatsa'),

    url(r'^satyavrat/$',views.satyavrat,name='satyavrat'),

    url(r'^accomodate_singleroom/$',views.accomodate_singleroom,name='accomodate_singleroom'),

    url(r'^check_updates/$',views.check_updates,name='check_updates'),

    url(r'^passed_stats/$',views.passed_stats,name='passed_stats'),

    url(r'^availability_stats/$',views.availability_stats,name='availability_stats'),

    url(r'^view_stats/$',views.view_stats,name='view_stats'),

    url(r'^disp_occupency/$',views.disp_occupency,name='disp_occupency'),

    url(r'^edit_occupency/$',views.edit_occupency,name='edit_occupency'),

    url(r'^deallocated_page/$',views.deallocated_page,name='deallocated_page'),

    url(r'^fine_page/$',views.fine_page,name='fine_page'),

    url(r'^view_notes/$',views.view_notes,name='view_notes'),

    url(r'^add_note/$',views.add_note,name='add_note')
    
]