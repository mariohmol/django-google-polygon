from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from gmappolygons.models import Area,Point

def index(request):
    return render(request, 'gmappolygons/index.html')

def add(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def submit(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def show(request,area_id):
    area = get_object_or_404(Area, pk=area_id)
    context = {'area': area}
    return render(request, 'gmappolygons/area.html', context)

