Basic React Django CRUD Application
----------------------------------
This repository contains a basic a comprehensive Event and Employee Management System built using Django for the backend and React with Bootstrap and React Toastify for the frontend. The application enables users to manage employee records, departments, and various events effectively.

## Technologies Used
- Backend:
    * ***Django***
- Frontend:
    * ***React***
        - UI Library: Bootstrap
        - Notification Library: React Toastify
  
## Features
- Django Applications
  1. EventApp
      * Manages events with various attributes and types.
      * Supports different event types like meetings, webinars, and reminders.
  2. EmployeeApp
      * Handles employee records and their details.

- React Components
  1. Department
      * Facilitates CRUD operations for managing departments.
  2. Employee
      * Implements CRUD operations for employee management.
  3. Calendar
      * Showcases a calendar with created events.
  4. Notify
      * Displays notifications using React Toastify for a better user experience.

## API Endpoints
1. **Events**
    1. *GET* `/event/`: Retrieve all events.
    2. *GET* `/event/uuid:event_id`: Retrieve an event by ID.
2. **Departments**
    1. *GET* `/department/`: Retrieve all departments.
    2. *GET* `/department/int:department_id`: Retrieve a department by ID.
    3. *POST* `/department/`: Add a new department.
    4. *PUT* `/department/int:department_id`: Update a department by ID.
    5. *DELETE* `/department/int:department_id`: Delete a department by ID.
3. **Employees**
    1. *GET* `/employee/`: Retrieve all employees.
    2. *GET* `/employee/int:employee_id`: Retrieve an employee by ID.
    3. *POST* `/employee/saveFile`: Save employee file (e.g., photo).
    4. *POST* `/employee/`: Add a new employee.
    5. *PUT* `/employee/int:employee_id`: Update an employee by ID.
    6. *DELETE* `/employee/int:employee_id`: Delete an employee by ID.

## How to Run
1. Backend Setup:
   - Install dependencies using `pip install django`.
   - Create a database and set the following credentials in your Django settings.py:
      -  DATABASE NAME: ```your_database_name```
      -  USERNAME: ```your_username```
      -  PASSWORD: ```your_password```
      -  Run database migrations
            ```
            python manage.py makemigrations
            python manage.py migrate
            python manage.py runserver
            ```
2. Frontend Setup:
   - Navigate to the React app ( my-react-app ) folder.
   - Install dependencies using `npm install`.
   - Start the application with `npm start`.

## Screenshots
1. **Employee Display**
     This screen shows the list of employees along with their details such as name, email, department, and date of joining.
    ![image](https://github.com/user-attachments/assets/07377ec2-712c-4ce8-a1b2-80eb1c9508e4)

3. **Employee Update**
     This interface allows users to edit the details of a selected employee. Users can update information such as name, email, department, and upload a new photo.
    ![image](https://github.com/user-attachments/assets/461b42a6-c1e0-433a-b8c0-baf5cb77ea30)

5. **Employee Delete**
     This confirmation screen prompts users to confirm the deletion of an employee record. It helps prevent accidental deletions.
    ![image](https://github.com/user-attachments/assets/1a7c647f-7e09-4afa-b63f-e06c3bdcebe2)

7. **Calendar Display, with events**
     The calendar view showcases scheduled events, allowing users to see all upcoming events in a clear and organized manner.
    ![image](https://github.com/user-attachments/assets/74ef5125-a1fb-469b-8818-fefe997c4525)

9. **React Toastify**
     This demonstrates the use of React Toastify for displaying notifications within the application. It provides users with feedback on actions performed, such as successful updates or deletions.
    ![image](https://github.com/user-attachments/assets/73babf20-6267-4d55-9c1d-278ba8168161)
