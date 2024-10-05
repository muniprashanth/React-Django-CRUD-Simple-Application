import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '../Custom/CustomIcons';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Poll=()=>{
    const [options,setOptions] = useState([{ id: 1, text: '', votes: 0 }]);

    const handleAddOption=() => {
        const newId=options.length + 1;
        setOptions([...options, { id: newId, text: '', votes: 0 }]);
    };

    const handleDeleteOption=(id)=> {
        const updatedOptions = options.filter(option => option.id !== id);
        setOptions(updatedOptions.map((option, index) => ({ ...option, id: index + 1 })));
    };

    const handleOptionChange = (id, key, value) => {
        setOptions(options.map(option => {
            if (option.id === id) {
                return { ...option, [key]: value };
            }
            return option;
        }));
    };

    return (
        <>
            <h3>This is Poll Page</h3>
            <Button variant='primary' className="rounded-circle float-end" onClick={handleAddOption}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Form.Group controlId="pollOption" className="mb-3">
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Enter your poll Question here"
                />
            </Form.Group>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Options</th>
                        <th>Votes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {options.map(option => (
                        <tr key={option.id}>
                            <td>{option.id}</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Enter Option ${option.id}`}
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Votes"
                                    value={option.votes}
                                    onChange={(e) => handleOptionChange(option.id, 'votes', parseInt(e.target.value))}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleDeleteOption(option.id)}
                                    disabled={options.length === 1}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Poll;