# Generated by Django 4.2.1 on 2024-02-27 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EventApp', '0006_alter_event_duration_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='repeat_type',
            field=models.CharField(blank=True, choices=[('0', 'Every Monthly'), ('1', 'Every Weekly'), ('2', 'Every Monday'), ('3', 'Every Tuesday'), ('4', 'Every Wednesday'), ('5', 'Every Thursday'), ('6', 'Every Friday'), ('7', 'Every Saturday'), ('8', 'Every Sunday')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='type',
            field=models.CharField(blank=True, choices=[('birthday', 'Birthday'), ('course', 'Course'), ('meeting', 'Meeting'), ('webinar', 'Webinar'), ('appointment', 'Appointment'), ('reminder', 'Reminder'), ('seminar', 'Seminar'), ('holiday', 'Holiday'), ('event', 'Event')], max_length=20, null=True),
        ),
    ]
