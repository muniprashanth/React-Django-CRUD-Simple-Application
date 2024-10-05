from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.core.files.storage import default_storage

from .serializers import *
from .models import *

@csrf_exempt
def eventApi(request,event_id=None):
    if request.method == 'GET':
        event=Event.objects.all()
        event_serializer=EventSerializer(event,many=True)
        return JsonResponse(event_serializer.data,safe=False)

    elif request.method == 'POST':
        event_data=JSONParser().parse(request)
        event_serializer=EventSerializer(data=event_data)
        if event_serializer.is_valid():
            event_serializer.save()
            return JsonResponse("Added Successfully..!",safe=False)
        return JsonResponse(event_serializer.errors,status=400)
    
    elif request.method == 'PUT':
        event_data=JSONParser().parse(request)
        event=Event.objects.get(id=event_id)
        event_serializer=EventSerializer(event, data=event_data)
        if event_serializer.is_valid():
            event_serializer.save()
            return JsonResponse("Updated Successfully...!")
        return JsonResponse(event_serializer.errors,status=400)
    
    elif request.method == 'DELETE':
        event=Event.objects.all()
        event.delete()
        return JsonResponse("All Events Deleted Successfully..!",safe=False)

    elif request.method == 'DELETE':
        event=Event.objects.get(id=event_id)
        event.delete()
        return JsonResponse("Deleted Successfully..!",safe=False)
# Create your views here.
