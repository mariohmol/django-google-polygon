from django.conf.urls import patterns, include, url
from django.contrib import admin
from gmappolygons import views

urlpatterns = patterns('',
   url(r'^$', views.index, name='index'),
   url(r'^add', views.add, name='add'),
   url(r'^submit', views.submit, name='submit'),
   url(r'^show/(?P<area_id>\d+)/', views.show, name='show'),
)
