# Generated by Django 4.2.1 on 2024-02-27 03:35

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('type', models.CharField(blank=True, choices=[('birthday', 'Birthday'), ('course', 'Course'), ('meeting', 'Meeting'), ('webinar', 'Webinar'), ('appointment', 'Appointment'), ('remainder', 'Remainder'), ('seminar', 'Seminar'), ('holiday', 'Holiday'), ('event', 'Event')], max_length=20, null=True)),
                ('selected_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('duration_type', models.CharField(blank=True, choices=[('without_duration', 'Without Duration'), ('until', 'Until')], max_length=20, null=True)),
                ('duration_time', models.DateTimeField(blank=True, null=True)),
                ('repeat_event', models.BooleanField(default=False)),
                ('repeat_type', models.CharField(blank=True, choices=[('0', 'Every Monthly'), ('1', 'Every Weekly'), ('2', 'Every Monday'), ('3', 'Every Tuesday'), ('4', 'Every Wednesday'), ('5', 'Every Thursday'), ('6', 'Every Friday'), ('7', 'Every Saturday'), ('8', 'Every Sunday')], max_length=2, null=True)),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
                ('date_updation', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
