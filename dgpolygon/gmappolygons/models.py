from django.db import models
from django.contrib.gis.geos import GEOSGeometry

class Area(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    date = models.DateTimeField('date published')
    


class Point(models.Model):
    area = models.ForeignKey(Area)
    lat = models.DecimalField(max_digits=11,decimal_places=8)
    lng = models.DecimalField(max_digits=11,decimal_places=8)
    
