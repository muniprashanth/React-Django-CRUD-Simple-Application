import React,{useState,useEffect} from 'react';
import { Table, Button } from 'react-bootstrap';
import { variables } from '../Variables';
import { FontAwesomeIcon,Icons } from '../Custom/CustomIcons';
import CustomDate from '../CustomFormat/CustomDate';
import CustomModal from '../Custom/CustomModal';
import EventForm from './EmployeeForm';

const Employee=()=>{
    const [employees,setEmployees]=useState([]);
    const [showModal, setShowModal]=useState(false);
    const [modalTitle, setModalTitle]=useState('');
    const [modalBody, setModalBody]=useState(null);
    const [errorMessage, setErrorMessage] = useState('');


    const handleCloseModal=()=>{
        setShowModal(false);
        setModalTitle('');
        setModalBody(null);
    }

    const refreshListEmployee= () => {
        fetch(variables.API_URL + 'employee')
            .then(response => {
                setErrorMessage('Server Down');
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    setErrorMessage('No Data Exists');
                }
                setEmployees(data);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    useEffect(()=>{
        refreshListEmployee();
    },[]);

    const handleCreate = () => {
        setModalTitle('Create Employee');
        setModalBody(
            <>
                <EventForm/>
            </>
        );
        setShowModal(true);
    };
    
    const handleEdit=(emp)=>{
        setModalTitle("Edit Employee");
        setModalBody(
            <>
                <EventForm emp={emp} handleClose={handleCloseModal} refreshList={refreshListEmployee}/>
            </>
        );
        setShowModal(true);
    }

    const deleteEmployee=(emp)=> {
        fetch(variables.API_URL + 'employee/'+emp.EmployeeId,{
            method:'DELETE',
        })
        .then(response => response.json())
            .then(data=>{
                alert('Employee deleted successfully');
                alert(data);
                handleCloseModal(); 
            })
            .catch(error => {
                alert("Failed to delete employee");
                alert(error.message);
        });
        refreshListEmployee();
    };

    const handleDelete=(emp)=>{
        setModalTitle("Delete Employee");
        setModalBody(
            <>
                <p>Are you sure you want to delete Employee?</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>{emp.EmployeeName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{emp.Email}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{emp.Department}</td>
                        </tr>
                        <tr>
                            <td>Date Of Joining</td>
                            <td><CustomDate dateString={emp.DateOfJoining}/></td>
                        </tr>
                    </tbody>
                </Table>
                <form>
                    <Button variant="primary" onClick={()=> deleteEmployee(emp)}>Delete</Button>
                </form>
            </>
        );
        setShowModal(true);
    }

    return(
        <>
            <h3>This is Employee Page</h3>
            <Button variant='primary' className="rounded-circle float-end" onClick={handleCreate}>
                <FontAwesomeIcon icon={Icons.faAdd} />
            </Button>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Date Of Joining</th>
                        <th>Photo File Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {!employees || employees.length === 0 ? (
                        <tr>
                            <td colSpan="7">{errorMessage}</td>
                        </tr>
                    ) : (
                        employees.map(emp=>(
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Email}</td>
                                <td>{emp.Department}</td>
                                <td><CustomDate dateString={emp.DateOfJoining}/></td>
                                <td>{emp.PhotoFileName}</td>
                                <td>
                                    <Button variant='primary' className="rounded-circle" onClick={()=>handleEdit(emp)}>
                                        <FontAwesomeIcon icon={Icons.faEdit}/>
                                    </Button>
                                    {'  '}
                                    <Button variant='danger' className="rounded-circle" onClick={()=>handleDelete(emp)}>
                                        <FontAwesomeIcon icon={Icons.faTrash}/>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <CustomModal 
                showModal={showModal} 
                handleClose={handleCloseModal}
                title={modalTitle}
                body={modalBody} 
                footer={
                    <>
                        <p>
                            Footer Page
                        </p>
                    </>
                }
            />
        </>
    );
}

export default Employee;