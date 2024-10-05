// ReactCalendar.jsx
import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Accordion, Card, ListGroupItem, ListGroup } from 'react-bootstrap';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../Custom/CustomModal';
import EventForm from './EventForm';
import CustomSpinner from '../Loader/CustomSpinner';
import { FontAwesomeIcon, Icons } from '../Custom/CustomIcons';
import EventList from './Events';
import CustomOverlay from '../Custom/CustomOverlay';
import './Calendar.css';

const ReactCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const nextMonth = () => {
    setLoading(true);
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setLoading(true);
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  };

  useEffect(() => {
      setLoading(false);
  }, [currentMonth]);

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setShowModal(true);
  };

  const showModalEvent = () => {
    const now = new Date();
    setSelectedDate(now);
    setShowModal(true);
  };

  const renderCalendar = () => {
    const totalDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysArray = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const cells = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > totalDays) {
          cells.push(<td className="empty-cell" key={`${i}-${j}`} />);
        } else {
          const currentDay = day;
          cells.push(
            <td key={currentDay} className="day" onClick={() => handleDateClick(currentDay)}>
              {currentDay} 
            </td>
          );
          day++;
        }
      }
      daysArray.push(<tr key={i} >{cells}</tr>);
    }

    return daysArray;
  };

  return (
    <div className="calendar-container">
      <Row className="calendar-header">
        <Col xs={2}>
          <CustomOverlay overlayContent={"Previous Month"} children={
            <Button className="nav-button" onClick={prevMonth}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          }
          />
        </Col>
        <Col xs={5} className="header-title">
          <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        </Col>
        <Col xs={2} className="header-action">
          <CustomOverlay overlayContent={"Next Month"} children={
            <Button className="nav-button" onClick={nextMonth}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          }
          />
        </Col>
        <Col xs={3} className="header-action">
          <Button className="create-event-button" onClick={showModalEvent}>
              <FontAwesomeIcon icon={Icons.faAdd} /> Create Event
          </Button>
        </Col>
      </Row>
      {loading ? (
          <CustomSpinner/>
      ) : (
        <>
        <div class="table-responsive">
          <Table striped bordered hover className="calendar-table">
            <thead className="thead-dark">
              <tr className='text-center'>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody className='text-center'>{renderCalendar()}</tbody>
          </Table>
        </div>
          <EventList/>

          <CustomModal
            showModal={showModal}
            handleClose={() => setShowModal(false)}
            title="Event Form"
            body={<EventForm selectedDate={selectedDate}/>}
          />
        </>
      )}
    </div>
  );
};

export default ReactCalendar;