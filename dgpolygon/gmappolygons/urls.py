from django.conf.urls import patterns, include, url
from django.contrib import admin
from gmappolygons import views

urlpatterns = patterns('',
   url(r'^$', views.index, name='index'),
   url(r'^search', views.search, name='search'),
   url(r'^submit/$', views.submit, name='submit'),
   url(r'^show/(?P<area_id>\d+)/', views.show, name='show'),
)
