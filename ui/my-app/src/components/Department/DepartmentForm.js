import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from "react-bootstrap";
import CustomModal from '../Custom/CustomModal';
const DepartmentForm=({ showModal, crud, value, handleClose, create, remove, update,setValue })=>{
    const [modalTitle, setModalTitle]=useState('');
    useEffect(()=>{
        if (crud === 0) 
        {
            setModalTitle('Create Department');
        }
        else if (crud === 1) 
        {
            setModalTitle('Edit Department');
        }
        else if(crud === -1)
        {
            setModalTitle('Delete Department');
        }
    }, [crud]);
    const getContent=()=>{
        if (crud === 0 || crud === 1) 
        {
            return (
                <Form>
                    <Form.Group controlId="userName" className="mb-3">
                        <Form.Label>Department Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder='Enter Department Name'
                                name="departmentName"
                                id="departmentName"
                                defaultValue={value.DepartmentName}
                                onChange={(e) => setValue({ ...value, DepartmentName: e.target.value })}
                            />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={crud === 0 ? create : update}>Save</Button>
                </Form>
            );
        }
        else if (crud === -1)
        {
            return (
                <Form>
                    <p>Are you sure you want to delete Employee?</p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Department Id</th>
                                <th>{value.DepartmentId}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Department Name</td>
                                <td>{value.DepartmentName}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={()=>remove()}>Save</Button>
                </Form>
            );
        }
    };

    return (
        <CustomModal
            showModal={showModal}
            handleClose={handleClose}
            title={modalTitle}
            body={getContent()}
        />
    );
};
export default DepartmentForm;