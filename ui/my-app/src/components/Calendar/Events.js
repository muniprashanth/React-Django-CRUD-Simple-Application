import React, {useState} from 'react';
import { Accordion, Card, ListGroup, Carousel, Row, Col, Button } from 'react-bootstrap';
import { faBirthdayCake, faGraduationCap, faBriefcase, faDesktop, faCalendarCheck, faBell, faChalkboard, faUmbrellaBeach, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, Icons } from '../Custom/CustomIcons';
import CustomOverlay from '../Custom/CustomOverlay';
import CustomNotify from '../Custom/CustomNotify';

import 'bootstrap/dist/css/bootstrap.min.css';

const EventList = () => {
  const [notify, setNotify] = useState({ type: '', message: '' });
  const events = [
    { type: 'Birthday', icon: faBirthdayCake },
    { type: 'Course', icon: faGraduationCap },
    { type: 'Meeting', icon: faBriefcase },
    { type: 'Webinar', icon: faDesktop },
    { type: 'Appointment', icon: faCalendarCheck },
    { type: 'Reminder', icon: faBell },
    { type: 'Seminar', icon: faChalkboard },
    { type: 'Holiday', icon: faUmbrellaBeach },
    { type: 'Event', icon: faStar }
  ];

  return (
    <>
    <CustomNotify type={notify.type} message={notify.message} />
      <Card>
        <Card.Header>
            Events
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <Accordion className="event-accordion">
              {events.map((event, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Card>
                    <Accordion.Header>
                    <FontAwesomeIcon icon={event.icon} className="event-icon" fixedWidth />{'   '}{event.type}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card>
                        <Card.Header as="h5">
                          <Row className="calendar-header">
                            <Col>
                                Create Event
                            </Col>
                            <Col xs={1}>
                              <CustomOverlay overlayContent={"Edit"} children={
                              <Button variant='primary' className="rounded-circle">
                                  <FontAwesomeIcon icon={Icons.faEdit}/>
                              </Button>
                              }
                              />{'  '}
                              <CustomOverlay overlayContent={"Delete"} children={
                              <Button variant='danger' className="rounded-circle">
                                  <FontAwesomeIcon icon={Icons.faTrash}/>
                              </Button>
                              }
                              />
                            </Col>
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>Special title treatment</Card.Title>
                          <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Card>
                </Accordion.Item>
              ))}
            </Accordion>
            <br />
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
};

export default EventList;