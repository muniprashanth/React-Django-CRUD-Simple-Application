import React, { useState, useEffect } from "react";
import { Table, Button, Nav, Form } from "react-bootstrap";
import { variables } from '../Variables';
import { FontAwesomeIcon,Icons } from '../Custom/CustomIcons';
import DepartmentForm from "./DepartmentForm";
import CustomSort from "../CustomFormat/CustomSort";
import CustomPaginator from "../CustomFormat/CustomPaginator";
import CustomEntity from "../CustomFormat/CustomEntity";
import CustomSearch from "../CustomFormat/CustomSearch";

const Department=()=>{
    const [departments, setDepartments]=useState([]);
    const [showModal, setShowModal]=useState(false);
    const [crud, setCrud]=useState(0);
    const [value, setValue]=useState([]);
    const [errorMessage, setErrorMessage]=useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    
    const handleCreate=()=>{
        setCrud(0);
        setShowModal(true);
        setValue([]);
    }

    const handleEdit=(dep)=>{
        setCrud(1);
        setShowModal(true);
        setValue(dep);
        alert(dep.DepartmentId+" "+dep.DepartmentName);
    }
    
    const handleDelete=(dep)=>{
        setCrud(-1);
        setShowModal(true);
        setValue(dep);
        alert(dep.DepartmentId+" "+dep.DepartmentName);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setCrud(0);
        setValue(null);
    };

    const createDepartment=() => {
        alert("create "+value.DepartmentId);
        alert("create "+value.DepartmentName);
        fetch(variables.API_URL + "department/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                DepartmentName: value.DepartmentName,
            }),
        })
        .then((response) => {
            setErrorMessage('Server Down');
            response.json()
        })
        .then((data) => {
            alert("Department created successfully");
            handleCloseModal();
            refreshListDepartment();
        })
        .catch((error) => {
            console.log(error.message);
            refreshListDepartment();
            setErrorMessage(error.message);
        });
    };
  
    const updateDepartment = (dep) => {
        alert("update "+value.DepartmentId);
        alert("update "+value.DepartmentName);
        console.log(value.DepartmentId+" "+value.DepartmentName);
        fetch(variables.API_URL + "department/" +dep.DepartmentId, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                DepartmentName: value.DepartmentName,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Department edited successfully "+data);
            handleCloseModal();
            refreshListDepartment();
        })
        .catch((error) => {
            console.log(error.message);
            refreshListDepartment();
            setErrorMessage(error.message);
        });
    };
    const deleteDepartment = () => {
        alert("delete "+value.DepartmentId);
        alert("delete "+value.DepartmentName);
        fetch(variables.API_URL + "department/" + value.DepartmentId, {
            method: "DELETE",
        })
        .then((res) => console.log(res))
        .then((data) => {
            alert("Department deleted successfully ");
            handleCloseModal();
            refreshListDepartment();
        })
        .catch((error) => {
            setErrorMessage(error.message);
            console.log(error.message);
        });
    };

    const refreshListDepartment=() => {
        fetch(variables.API_URL + 'department')
            .then(response => {
                setErrorMessage('Server Down');
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    setErrorMessage('No Data Exists');
                }
                setDepartments(data);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    useEffect(() => {
        refreshListDepartment();
    }, []);

    const sortDepartment=(key) => {
        let direction = null;
        if(sortConfig.key === key) 
        {
            if (sortConfig.direction === 'ascending') 
            {
                direction = 'descending';
            }
            else 
            {
                direction = 'ascending';
            }
        }
        else 
        {
            direction = 'ascending';
        }
        setSortConfig({ key,direction });
        const sortedData=CustomSort(departments, key, direction);
        setDepartments(sortedData);
    };

    const [currentPage,setCurrentPage]=useState(1);
    const [entries,setEntries]=useState(10);
    const [search, setSearch]=useState('');
    const paginate=(pageNumber)=>setCurrentPage(pageNumber);

    return (
        <>
            <h2>Dept Page</h2>
            <Button variant='primary' className="rounded-circle float-end" onClick={handleCreate}>
                <FontAwesomeIcon icon={Icons.faAdd} />
            </Button>
            <br/>
            <CustomSearch searchTerm={search} setSearchTerm={setSearch}/>
            <br/><br/>
            <>
                <div className="float-start">
                    <CustomEntity
                        entries={entries}
                        setEntries={setEntries}
                        setCurrentPage={setCurrentPage}
                    />                    
                </div>
                <div className="float-end">
                    <CustomPaginator 
                        data={departments} 
                        entries={entries} 
                        currentPage={currentPage} 
                        paginate={paginate}
                    />
                </div>
            </>
            <Table striped bordered hover>
                <thead border={1}>
                    <tr>
                        <th onClick={() => sortDepartment('DepartmentId')}>
                            <Nav.Link href="#">Department Id 
                                {sortConfig.key === 'DepartmentId' && sortConfig.direction === 'ascending' ? (
                                    <FontAwesomeIcon icon={Icons.faSortAlphaAsc} />
                                ) : sortConfig.key === 'DepartmentId' && sortConfig.direction === 'descending' ? (
                                    <FontAwesomeIcon icon={Icons.faSortAlphaDesc} />
                                ) : (
                                    <FontAwesomeIcon icon={Icons.faSort}/>
                                )}
                            </Nav.Link>
                            </th>
                        <th onClick={() => sortDepartment('DepartmentName')}>
                            <Nav.Link href="#">Department Name 
                                {sortConfig.key === 'DepartmentName' && sortConfig.direction === 'ascending' ? (
                                    <FontAwesomeIcon icon={Icons.faSortAlphaAsc} />
                                ) : sortConfig.key === 'DepartmentName' && sortConfig.direction === 'descending' ? (
                                    <FontAwesomeIcon icon={Icons.faSortAlphaDesc} />
                                ) : (
                                    <FontAwesomeIcon icon={Icons.faSort}/>
                                )}
                            </Nav.Link>
                            </th>
                        <th>
                            <Nav.Link>
                                Options
                            </Nav.Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!departments || departments === 0 ? (
                        <tr>
                            <td colSpan="3">{errorMessage}</td>
                        </tr>
                    ) : (
                        departments
                            .filter(dep => {
                                if (!search) return true;
                                return (
                                    dep.DepartmentId.toString().includes(search) ||
                                    dep.DepartmentName.toLowerCase().includes(search)
                                )
                            })
                            .slice((currentPage-1)*entries,currentPage*entries)
                            .map((dep) =>(
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <Button variant='primary' className="rounded-circle" onClick={() => handleEdit(dep)}>
                                        <FontAwesomeIcon icon={Icons.faEdit} />
                                    </Button>
                                    {'  '}
                                    <Button variant='danger' className="rounded-circle" onClick={() => handleDelete(dep)}>
                                        <FontAwesomeIcon icon={Icons.faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            {showModal? (
                <>
                    <DepartmentForm 
                        showModal={showModal}
                        crud={crud}
                        value={value}
                        handleClose={handleCloseModal}
                        create={() => createDepartment(value)}
                        update={() => updateDepartment(value)}
                        remove={() => deleteDepartment(value.id)}
                        setValue={setValue}
                    />
                </>
            ): null}
        </>
    );
}; 
export default Department;
  