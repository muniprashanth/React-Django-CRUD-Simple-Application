import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
const CustomEntity = ({ entries, setEntries, setCurrentPage }) => {
    const handleEntriesPerPageChange = (e) => {
        setEntries(parseInt(e.target.value));
        setCurrentPage(1);
    };
    const index= [5,10,15,20,25,30,35,40,45,50];
    return (
        <div>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Showing</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control as="select" value={entries} onChange={handleEntriesPerPageChange}>
                            {index.map(option=>(
                                <option key={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>entries</Form.Label>
                    </Col>
                </Row>
            </Form.Group>
        </div>
    );
};

export default CustomEntity;
