from django.conf.urls import patterns, include, url
from django.contrib import admin
from gmappolygons import views

urlpatterns = patterns('',
    url(r'^$', 'gmappolygons.views.index', name='index'),
    url(r'^gmappolygons/', include('gmappolygons.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
