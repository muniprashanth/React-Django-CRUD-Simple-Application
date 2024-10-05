from django.db import models

# Create your models here.

class Departments(models.Model):
    DepartmentId=models.AutoField(primary_key=True)
    DepartmentName=models.CharField(max_length=500)

class Employees(models.Model):
    EmployeeId=models.AutoField(primary_key=True)
    EmployeeName=models.CharField(max_length=500)
    Email=models.CharField(max_length=500)
    Department=models.CharField(max_length=500)
    DateOfJoining=models.DateField()
    PhotoFileName=models.ImageField(upload_to='photos/')

    def __str__(self):
        return self.EmployeeName