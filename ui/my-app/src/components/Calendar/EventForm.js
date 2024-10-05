// EventForm.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Collapse, InputGroup } from 'react-bootstrap';
import { faBirthdayCake, faGraduationCap, faBriefcase, faDesktop, faCalendarCheck, faBell, faChalkboard, faUmbrellaBeach, faStar } from '@fortawesome/free-solid-svg-icons';
import CustomCollapse from '../Custom/CustomCollapse';
import CustomNotify from '../Custom/CustomNotify';
const EventForm = ({ selectedDate }) => {
    const [validated, setValidated] = useState(false);
    const modifiedDate = new Date(selectedDate);
    modifiedDate.setDate(modifiedDate.getDate() + 2);
    const [eventTitle, setEventTitle] = useState('');
    const [repeatEvent, setRepeatEvent] = useState(false);
    const [durationType, setDurationType] = useState('withoutDuration');
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [notify, setNotify] = useState({ type: '', message: '' });
    
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
  
    const handleRadioChange = (event) => {
        setDurationType(event.target.value);
    };

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
    

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function getCurrentTime() 
    {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
    }
    
    const handleDescriptionChange = (value) => {
        setDescription(value);
    };
  
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Event Title: </Form.Label>
            <Col sm="10">
                <Form.Control type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid event title.
                </Form.Control.Feedback>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Event Type: </Form.Label>
            <Col sm="10">
                <Form.Control as="select" required>
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

        <Form.Group as={Row}>
            <Form.Label column sm="2">Selected Date:</Form.Label>
            <Col sm="8">
                <Form.Control plaintext readOnly defaultValue={selectedDate ? selectedDate.toDateString() : 'No date selected'} disabled/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid date.
                </Form.Control.Feedback>
            </Col>
        </Form.Group>

        <CustomCollapse open={open} children={
            <>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Event Description:</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows={3} onChange={handleDescriptionChange}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid description.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
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
                        checked={durationType === 'withoutDuration'}
                        onChange={handleRadioChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Until"
                        value="until"
                        name="durationType"
                        checked={durationType === 'until'}
                        onChange={handleRadioChange}
                    />
                    {durationType === 'until' && 
                        <Row>
                            <Col>
                                <Form.Control type="date" required value={modifiedDate ? modifiedDate.toISOString().slice(0, 10) : ''}/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid date.
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Control type="time" defaultValue={currentTime} required/> 
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid time.
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    }
                    <Form.Check
                        type="radio"
                        label="Duration in minutes"
                        value="inMinutes"
                        name="durationType"
                        checked={durationType === 'inMinutes'}
                        onChange={handleRadioChange}
                    />
                    {durationType === 'inMinutes' && (
                        <>
                            <Form.Control as="select" required>
                                <option value="">Open this select menu</option>
                                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((minutes) => (
                                    <option key={minutes} value={minutes}>
                                    {minutes} minutes
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid duration.
                            </Form.Control.Feedback>
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
            style={{ textDecoration: 'none', color: 'orange' }}
        >
          {open ? 'Show Less' : 'Show More'}
        </a>
        <Row className="justify-content-center">
            <Col xs="auto">
                <Button type="submit" variant="primary">Submit form</Button>
            </Col>
        </Row>
        
      </Form>
      
    );
};

export default EventForm;
