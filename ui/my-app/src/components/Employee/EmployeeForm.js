import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import ImageDisplay from '../Image/ImageDisplay';
import { variables } from '../Variables';

const EmployeeForm = ({ emp, handleClose, refreshList }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [photoFileName, setPhotoFileName] = useState('');
    const [empName, setEmpName] = useState(emp ? emp.EmployeeName : '');
    const [empEmail, setEmpEmail] = useState(emp ? emp.Email : '');
    const [empDepartment, setEmpDepartment] = useState(emp ? emp.Department : '');
    const [empDateOfJoin, setEmpDateOfJoin] = useState(emp ? emp.DateOfJoining : '');

    useEffect(() => {
        if (emp && emp.PhotoFileName) {
            setPhotoFileName(variables.API_URL + emp.PhotoFileName);
        }
    }, [emp]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setPhotoFileName(URL.createObjectURL(event.target.files[0]));
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPhotoFileName('');
        const fileInput = document.getElementById("formFile");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("EmployeeName", empName);
        formData.append("Email", empEmail);
        formData.append("Department", empDepartment);
        formData.append("DateOfJoining", empDateOfJoin);
        if (selectedFile) {
            formData.append("PhotoFileName", selectedFile);
        }

        const requestOptions = {
            method: emp ? "PUT" : "POST",  // Use PUT for update, POST for create
            body: formData,
        };

        const url = emp ? `${variables.API_URL}employee/${emp.id}/` : `${variables.API_URL}employee/`;

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err) }); // Handle errors
                }
                return response.json();
            })
            .then(data => {
                alert(`Employee Data ${emp ? "Updated" : "Created"} Successfully`);
                handleClose();
                refreshList();
            })
            .catch(error => {
                console.error("Error:", error.message); // Log error to console
                alert("Failed to save employee data: " + error.message); // Show error in alert
            });
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Form noValidate>
                        <Form.Group controlId="employeeName" className="mb-3">
                            <Form.Label>Employee name</Form.Label>
                            <Form.Control type="text" placeholder="Employee name" aria-label="Employee name" value={empName} onChange={(e) => setEmpName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="firstName" className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Control type="text" placeholder="Enter department" value={empDepartment} onChange={(e) => setEmpDepartment(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="lastName" className="mb-3">
                            <Form.Label>Date of Joining</Form.Label>
                            <Form.Control type="date" value={empDateOfJoin} onChange={(e) => setEmpDateOfJoin(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email Address" value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} required />
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={5}>
                    <div className="image-container" style={{ textAlign: 'center' }}>
                        {photoFileName ? (
                            <>
                                <img src={photoFileName} alt="Uploaded" style={{ width: '75%' }} />
                                <br/><br/>
                                {photoFileName}
                                <div>
                                    <Button variant="danger" onClick={handleRemoveFile}>Remove File</Button>
                                </div>
                            </>
                        ) : (
                            selectedFile ? (
                                <>
                                    <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" style={{ width: '75%' }} />
                                    <br /><br />
                                    <div>
                                        <Button variant="danger" onClick={handleRemoveFile}>Remove File</Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ImageDisplay imgPath="/images/Profile/Anonymous.jpg" imgalt="Profile" width="75%" />
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload Image</Form.Label>
                                        <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
                                    </Form.Group>
                                </>
                            )
                        )}
                    </div>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleSubmit}>{emp ? "Update" : "Save"}</Button>
        </Container>
    );
};

export default EmployeeForm;
