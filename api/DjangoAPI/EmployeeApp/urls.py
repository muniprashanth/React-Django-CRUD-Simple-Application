from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from .views import *

urlpatterns = [
    path('department/', departmentApi),
    path('department/<int:department_id>', departmentApi),

    path('employee/', employeeApi),
    path('employee/<int:employee_id>', employeeApi),

    path('employee/saveFile',saveFile)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
