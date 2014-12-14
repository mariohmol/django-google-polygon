from django.contrib.gis.db import models
import datetime

class Area(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    poly = models.PolygonField()
    objects = models.GeoManager()
    
