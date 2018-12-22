from django.conf.urls import url
from .import views

app_name = 'Firewallz'

urlpatterns = [
    url(r'^$',views.main, name='main'),

    url(r'^details/$',views.details, name='details'),

#   url(r'^confirm_group/(?P<player_list>\w+)/$',views.confirm_group,name='confirm_group'),

	url(r'^confirm_group/$',views.confirm_group,name='confirm_group'),

    url(r'^confirm_group_pusher/$',views.confirm_group_pusher,name='confirm_group_pusher'),

	url(r'^unconfirm_grp/$',views.unconfirm_grp,name='unconfirm_grp'),

    url(r'^add_participant/$',views.add_participant,name='add_participant'),

	url(r'^unconfirm_details/$',views.unconfirm_details,name='unconfirm_details'),

	url(r'^show_details_unconfirm/$',views.show_details_unconfirm,name='show_details_unconfirm'),

	url(r'^unconfirm_player/$',views.unconfirm_player,name='unconfirm_player'),

    url(r'^unconfirm_player_grp/$',views.unconfirm_player_grp,name='unconfirm_player_grp'),

	url(r'^sportlist/$',views.sportlist,name='sportlist'),

    url(r'^passed_stats/$',views.passed_stats,name='passed_stats'),

    url(r'^id_card/(?P<string>\w+)/$',views.id_card,name='id_card'),

    url(r'^collegelist/$',views.collegelist,name='collegelist'),

    url(r'^view_stats/$',views.view_stats,name='view_stats'),
    
    url(r'^stats_excel/$',views.stats_excel,name='stats_excel'),

    url(r'^stats_csv/$',views.stats_csv,name='stats_csv'),

 #   url(r'^render_to_pdf/$',views.render_to_pdf,name='render_to_pdf'),

    url(r'^stats_html/$',views.stats_html,name='stats_html'),

    url(r'^view_id_card/$',views.view_id_card,name='view_id_card'),

	#	this url opens a new html file to show the documents of approoved participants(verified docs link in side nav of firewallz page)
	url(r'^view_docs/$',views.view_docs,name='view_docs'),
  	url(r'^view_id_card_details/$',views.view_id_card_details,name='view_id_card_details'),
	url(r'^grp_stats/$',views.grp_stats,name='grp_stats'),
    url(r'^view_id_card_show_details/$',views.view_id_card_show_details,name='view_id_card_show_details'),

	#Last three lines are to view documents of the verified participants	
	url(r'^view_docs/documents/$',views.render_pcrmail,name='render_pcrmail'),
	url(r'^view_docs/documents/team/$',views.docurl,name='docurl'),
    url(r'^view_docs/documents/approve/$',views.docapprove,name='docapprove'),
]
