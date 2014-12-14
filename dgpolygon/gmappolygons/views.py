from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from gmappolygons.models import Area
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'gmappolygons/index.html')

@csrf_exempt
def search(request):   
    point=request.POST.get("point", "")
    pointTxt='POINT('+point+')'     #pointTxt='POINT(-0.87890625 52.696361078274485)'
    result = Area.objects.filter(poly__contains=pointTxt)    
    if result:      #result[0].name
        return HttpResponse("Your location is inside our service area!")
    return HttpResponse("Sorry but your location is out of our service area!")

@csrf_exempt
def submit(request):        
    #wkt = "POLYGON((-12.12890625 58.768200159239576, 1.1865234375 58.49369382056807, 5.537109375 50.2612538275847, -12.9638671875 49.18170338770662, -12.12890625 58.768200159239576))"
    polygon=request.POST.get("polygon", "")
    wkt = "POLYGON(("+polygon+"))"
    pe = Area.objects.create(name="uk_polygon", poly=wkt)
    return HttpResponse(pe.id)

@csrf_exempt
def show(request,area_id):
    area = get_object_or_404(Area, pk=area_id)
    context = {'area': area}
    response_data = {'data':None,}
    response_data['data'] = {
        'polygons' : area.poly.geojson,
        'title' : area.name
    }
    return HttpResponse(json.dumps(response_data))

