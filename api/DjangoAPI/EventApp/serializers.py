from rest_framework import serializers
from .models import *

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields=('id','title','type','selected_date','description','repeat_event','repeat_type','duration_type','duration_time','date_creation','date_updation')