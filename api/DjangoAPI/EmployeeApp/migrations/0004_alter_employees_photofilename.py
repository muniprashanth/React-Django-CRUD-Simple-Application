# Generated by Django 4.2.1 on 2024-02-24 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeApp', '0003_employees_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employees',
            name='PhotoFileName',
            field=models.ImageField(upload_to='photos/'),
        ),
    ]