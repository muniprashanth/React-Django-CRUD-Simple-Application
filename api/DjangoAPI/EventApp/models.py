from django.db import models
import uuid

class Event(models.Model):
    EVENT_TYPES = [
        ('birthday', 'Birthday'),
        ('course', 'Course'),
        ('meeting', 'Meeting'),
        ('webinar', 'Webinar'),
        ('appointment', 'Appointment'),
        ('reminder', 'Reminder'),  # Corrected 'remainder' to 'reminder'
        ('seminar', 'Seminar'),
        ('holiday', 'Holiday'),
        ('event', 'Event'),
    ]

    REPEAT_CHOICES = [
        ('0', 'Every Monthly'),
        ('1', 'Every Weekly'),
        ('2', 'Every Monday'),
        ('3', 'Every Tuesday'),
        ('4', 'Every Wednesday'),
        ('5', 'Every Thursday'),
        ('6', 'Every Friday'),
        ('7', 'Every Saturday'),
        ('8', 'Every Sunday'),
    ]

    DURATION_CHOICES = [
        (False, 'Without Duration'),
        (True, 'Until'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=20, choices=EVENT_TYPES, blank=True, null=True)
    selected_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    duration_type = models.BooleanField(choices=DURATION_CHOICES, default=False,blank=True, null=True)
    duration_time = models.DateTimeField(blank=True, null=True)
    repeat_event = models.BooleanField(default=False)
    repeat_type = models.CharField(max_length=1, choices=REPEAT_CHOICES, blank=True, null=True)  # Changed max_length to 1 for REPEAT_CHOICES
    date_creation = models.DateTimeField(auto_now_add=True)
    date_updation = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title