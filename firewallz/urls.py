from django.conf.urls import url
from .import views

app_name = 'Firewallz'

urlpatterns = [
    url(r'^$',views.main, name='main'),

    url(r'^details/$',views.details, name='details'),

#   url(r'^confirm_group/(?P<player_list>\w+)/$',views.confirm_group,name='confirm_group'),

	url(r'^confirm_group/$',views.confirm_group,name='confirm_group'),

	url(r'^unconfirm_grp/$',views.unconfirm_grp,name='unconfirm_grp'),

    url(r'^add_participant/$',views.add_participant,name='add_participant'),

	url(r'^unconfirm_details/$',views.unconfirm_details,name='unconfirm_details'),

	url(r'^show_details_unconfirm/$',views.show_details_unconfirm,name='show_details_unconfirm'),

	url(r'^unconfirm_player/$',views.unconfirm_player,name='unconfirm_player'),

	url(r'^sportlist/$',views.sportlist,name='sportlist'),

    url(r'^passed_stats/$',views.passed_stats,name='passed_stats'),

    url(r'^id_card/(?P<string>\w+)/$',views.id_card,name='id_card'),


]
