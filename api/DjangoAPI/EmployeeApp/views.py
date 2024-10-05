from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.core.files.storage import default_storage

from .models import *
from .serializers import *

@csrf_exempt
def departmentApi(request, department_id=0):
    if request.method == 'GET':
        departments = Departments.objects.all()
        departments_serializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)
    
    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        departments_serializer = DepartmentSerializer(data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Added Successfully..!", safe=False)
        return JsonResponse(departments_serializer.errors, status=400)
    
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Departments.objects.get(DepartmentId=department_id)
        departments_serializer = DepartmentSerializer(department, data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Update Successfully..!", safe=False)
        return JsonResponse(departments_serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        department = Departments.objects.get(DepartmentId=department_id)
        department.delete()
        return JsonResponse("Deleted Successfully..!", safe=False)
    
@csrf_exempt
def employeeApi(request, employee_id=0):
    if request.method == 'GET':
        employees = Employees.objects.all()
        employees_serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe=False)

    elif request.method == 'POST':
        employee_data = request.POST.copy()  # Get POST data
        employee_data['PhotoFileName'] = request.FILES.get('PhotoFileName')  # Get file data

        employees_serializer = EmployeeSerializer(data=employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Added Successfully..!", safe=False)
        else:
            print(employees_serializer.errors)  # Print validation errors to console
            return JsonResponse(employees_serializer.errors, status=400)

    elif request.method == 'PUT':
        employee_data = request.POST.copy()  # Use request.POST for FormData
        employee_data['PhotoFileName'] = request.FILES.get('PhotoFileName')  # Get file data

        try:
            employee = Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
        except Employees.DoesNotExist:
            return JsonResponse('Employee not found.', status=404)

        employees_serializer = EmployeeSerializer(employee, data=employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Update Successfully!", safe=False)
        return JsonResponse(employees_serializer.errors, status=400)

    elif request.method == 'DELETE':
        employee = Employees.objects.get(EmployeeId=employee_id)
        employee.delete()
        return JsonResponse("Deleted Successfully..!", safe=False)

@csrf_exempt
def saveFile(request):
    file=request.FILES['files']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=True)