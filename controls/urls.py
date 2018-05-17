from django.conf.urls import url
from .import views

app_name = 'controls'

urlpatterns = [

    url(r'^$',views.main, name='main'),

    url(r'^details/$',views.details, name='details'),

    url(r'^create_bill/$',views.create_bill,name='create_bill'),

    url(r'^check_updates/$',views.check_updates,name='check_updates'),

    url(r'^arpit/$',views.arpit,name='arpit'),

    url(r'^piyali/$',views.piyali,name='piyali'),

    url(r'^generate_bill/$',views.generate_bill,name='generate_bill'),

    url(r'^unconfirm_grp/$',views.unconfirm_grp,name='unconfirm_grp'),

    url(r'^unconfirm_details/$',views.unconfirm_details,name='unconfirm_details'),

    url(r'^view_stats/$',views.view_stats,name='view_stats'),

    url(r'^unconfirm_player/$',views.unconfirm_player,name='unconfirm_player'),

    url(r'^passed_stats/$',views.passed_stats,name='passed_stats'),

    url(r'^stats_excel/$',views.stats_excel,name='stats_excel'),

    url(r'^stats_csv/$',views.stats_csv,name='stats_csv'),

 #   url(r'^render_to_pdf/$',views.render_to_pdf,name='render_to_pdf'),

    url(r'^stats_html/$',views.stats_html,name='stats_html'),

    url(r'^bill_pdf/(?P<bill_pk>[0-9]+)/$',views.bill_pdf,name='bill_pdf'),

   # url(r'^pdf/$',views.pdf,name='pdf'),
    
]
