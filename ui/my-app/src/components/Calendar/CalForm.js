import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { variables } from '../Variables';
import { FontAwesomeIcon, Icons } from '../Custom/CustomIcons';
import CustomModal from '../Custom/CustomModal';
import CustomDate from '../CustomFormat/CustomDate';
import CustomCollapse from '../Custom/CustomCollapse';
import CustomDateTime from '../CustomFormat/CustomDateTime';
import CustomTitle from '../CustomFormat/CustomTitle';
import CustomNotify from '../Custom/CustomNotify';

const CalForm = ({ showModal, crud, value, handleClose, selectedDate, create, update, remove, erase, setValue, repeatBy, errorMessage }) => {
    const formattedDate=selectedDate ? selectedDate.toLocaleDateString() : "";
    const [modalTitle,setModalTitle]=useState('');
    const [open, setOpen]=useState(false);
    const [durationType,setDurationType]=useState(false);
    const [repeatEvent,setRepeatEvent]=useState(false);

    const [notify, setNotify] = useState({ type: '', message: '' });
    const modifiedDate=new Date(selectedDate);
    modifiedDate.setDate(modifiedDate.getDate()+2);
    const [currentTime, setCurrentTime] = useState(new Date().toTimeString().slice(0,5));


    useEffect(()=>{
        let title = "";
        if (crud === 0) 
        {
            title="Create Event for ";
        } 
        else if (crud === 1) 
        {
            title="Edit Event for ";
        }
        else if (crud === -1) 
        {
            title="Delete Event for ";
        }
        else if (crud === -2) 
        {
            title="Do you want to Delete all Event's ";
        }
        const customDateElement = formattedDate ? <CustomDate dateString={formattedDate} /> : <CustomDate dateString={value.selected_date} />;
        if (crud !== -2) 
        {
            title=(
                <>
                    {title} {customDateElement}
                </>
            );
        }
        setModalTitle(title);
    }, [crud, formattedDate, currentTime]);

    const eventTypes = [
        'Birthday', 
        'Course', 
        'Meeting', 
        'Webinar',
        'Appointment',
        'Remainder',
        'Seminar',
        'Holiday',
        'Event',
    ];


    const getContent=()=>{
        if (crud === 0 || crud === 1)
        {
            return (
                <>
                    <Form noValidate>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Event Title: </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    type="text" 
                                    defaultValue={value.title !== undefined && value.title !== null ? value.title : ''}
                                    onChange={(e) => setValue({ ...value, title: e.target.value })}
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid event title.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Event Type: </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    as="select" 
                                    defaultValue={value.type} 
                                    onChange={(e) => setValue({ ...value, type: e.target.value })}
                                    required>
                                    <option value="">Select an event type</option>
                                    {eventTypes.map((eventType, index) => (
                                        <option key={index} value={eventType.toLowerCase()}>{eventType}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid event type.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Selected Date:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="date" 
                                    required
                                    onChange={(e) => setValue({ ...value, selected_date: e.target.value || selectedDate.toLocaleDateString('en-CA') })}
                                    defaultValue={selectedDate ? selectedDate.toLocaleDateString('en-CA') :  (value.selected_date || '')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid date.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <CustomCollapse open={open} children={
                            <>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">Description:</Form.Label>
                                    <Col sm="10">
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3} 
                                            defaultValue={value.description} 
                                            onChange={(e) => setValue({ ...value, description: e.target.value })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid description.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>


                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                    Duration:
                                    </Form.Label>
                                    <Col sm="10">
                                        <br/>
                                        <Form.Check
                                            type="radio"
                                            label="Without Duration"
                                            value="withoutDuration"
                                            name="durationType"
                                            checked={!durationType}
                                            onChange={() => {
                                                setDurationType(false);
                                                setValue({ ...value, duration_type: false });
                                            }}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Until"
                                            value="until"
                                            name="durationType"
                                            checked={durationType}
                                            onChange={() => {
                                                setDurationType(true);
                                                setValue({ ...value, duration_type: true });
                                            }}
                                        />

                                    {durationType && (
                                        <>
                                            <Form.Control
                                                type="datetime-local"
                                                name="datepic"
                                                placeholder="DateRange"
                                                required
                                                onChange={(e) => setValue({ ...value, duration_time: e.target.value || value.duration_time })}
                                                defaultValue={modifiedDate ? `${modifiedDate.toISOString().slice(0, 10)}T${currentTime}` : value.duration_time}
                                            />
                                        </>
                                    )}
                                    </Col>
                                </Form.Group>

                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Repeat Event"
                                checked={repeatEvent}
                                onChange={() => setRepeatEvent(!repeatEvent)}
                            />
                            
                        {repeatEvent && (

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">
                                    Repeat Event by :
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control as="select" required>
                                        <option value="">Open this select menu</option>
                                        <option value="0">Every Monthly</option>
                                        <option value="1">Every Weekly</option>
                                        <option value="2">Every Monday</option>
                                        <option value="3">Every Tuesday</option>
                                        <option value="4">Every Wednesday</option>
                                        <option value="5">Every Thursday</option>
                                        <option value="6">Every Friday</option>
                                        <option value="7">Every Saturday</option>
                                        <option value="8">Every Sunday</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                            Please provide a valid repeat event with timeline.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        )}
                            </>
                        }/>

                        <a
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="btn btn-link"
                            style={{ textDecoration: 'none', color: 'blue' }}
                        >
                        {open ? 'Show Less' : 'Show More'}
                        </a>
                        <Row className="justify-content-center">
                            <Col xs="auto">
                            <Button type="submit" variant="primary" onClick={crud === 0 ? ()=> create() : ()=>update()}>
                                {crud === 0  ? 'Create Event' : 'Edit Event'}
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </>
            );
        }
        else if(crud === -1)
        {
            return (
                <>
                    <Form>
                        <p>Are you sure you want to delete Employee?</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Event title</th>
                                    <th>{value.title}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Event Type</td>
                                    <td>{value.type}</td>
                                </tr>
                                <tr>
                                    <td>Event date selected</td>
                                    <td><CustomDate dateString={value.selected_date}/></td>
                                </tr>
                                <tr>
                                    <td>Event Description</td>
                                    <td>{value.description}</td>
                                </tr>
                                <tr>
                                    <td>Duration</td>
                                    <td>{value.duration_type ? 'Yes' : 'No'}</td>
                                </tr>
                                {value.duration_type ?
                                    <tr>
                                        <td>Duration Time</td>
                                        <td><CustomDateTime dateString={value.duration_time}/></td>
                                    </tr>
                                    : null
                                }
                                <tr>
                                    <td>Repeation</td>
                                    <td>{value.repeat_event ? 'Yes' : 'No'}</td>
                                </tr>
                                {value.repeat_event ?
                                    <tr>
                                        <td>Repeat Type</td>
                                        <td>{repeatBy(value.repeat_type) ? 'Yes' : 'No'}</td>
                                    </tr>
                                    : null
                                }
                            </tbody>
                        </Table>
                        <Button variant="primary" onClick={()=>remove()}>Save</Button>
                    </Form>
                </>
            );
        }
        else if(crud === -2)
        {
            return (
                <>
                    <>
                        <div className='float-start'>
                            <p>Are you sure you want to delete Events? (Once deleted, they cannot be restored)</p>
                        </div>
                        <div className='float-end'>
                            <Button variant="danger" onClick={()=>erase()} disabled={value.length === 0}>Delete All</Button>
                        </div>
                    </>
                    <br/>
                    <hr/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errorMessage ? (
                                <tr>
                                    <td colSpan="3">{errorMessage}</td>
                                </tr>
                            ) : (
                                value.map(event => (
                                    <tr key={event.id}>
                                        <td>{event.title}</td>
                                        <td>{event.type}</td>
                                        <td><CustomDate dateString={event.selected_date}/></td>
                                    </tr>
                                )))
                            }
                        </tbody>
                    </Table>
                </>
            );
        }
    };
    return (
        <>
            <CustomModal
                showModal={showModal}
                handleClose={handleClose}
                title={modalTitle}
                body={getContent()}
            />
        </>
    );
}

export default CalForm;
