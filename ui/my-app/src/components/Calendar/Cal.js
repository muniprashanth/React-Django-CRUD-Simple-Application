import React, {useState,useEffect} from 'react';
import { Table, Button, Row, Col } from "react-bootstrap";
import { variables } from '../Variables';
import { FontAwesomeIcon, Icons } from '../Custom/CustomIcons';
import CalForm from './CalForm';
import CustomDateTime from '../CustomFormat/CustomDateTime';
import CustomDate from '../CustomFormat/CustomDate';
import CustomTitle from '../CustomFormat/CustomTitle';
import CustomNotify from '../Custom/CustomNotify';
const MyCalendar=()=>{
    const [events, setEvents]=useState([]);
    const [currentMonth,setCurrentMonth]=useState(new Date());
    const [selectedDate,setSelectedDate]=useState(null);
    const [showModal,setShowModal]=useState(false);

    const [crud,setCrud]=useState(0);
    const [value,setValue]=useState([]);
    const [errorMessage, setErrorMessage]=useState('');

    const [notify, setNotify] = useState({ type: '', message: '' });

    const handleCreate=()=>{
        setCrud(0);
        const now = new Date();
        setSelectedDate(now);
        setShowModal(true);
        setValue([]);
    }

    const handleEdit=(evt)=>{
        setCrud(1);
        setShowModal(true);
        setValue(evt);
    }

    const handleDelete=(evt)=>{
        setCrud(-1);
        setShowModal(true);
        setValue(evt);
    }

    const handleAllDelete=(evt)=>{
        setCrud(-2);
        setShowModal(true);
        setValue(evt);
    }

    const handleCloseModel=()=>{
        setShowModal(false);
        setCrud(0);
        setValue(null);
    }

    const prevMonth=()=>{
        setCurrentMonth(
            (prevMonth)=> new Date(prevMonth.getFullYear(),prevMonth.getMonth()-1,1)
        );
    }

    const nextMonth=()=>{
        setCurrentMonth(
            (prevMonth)=> new Date(prevMonth.getFullYear(),prevMonth.getMonth()+1,1)
        );
    }

    const handleDateClick=(day)=>{
        setSelectedDate(new Date(currentMonth.getFullYear(),currentMonth.getMonth(),day));
        setShowModal(true);
    }

    const refreshListEvent=()=>{
        fetch(variables.API_URL + 'event')
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            if (!data || data.length === 0) 
            {
                setErrorMessage('No Data Exists');
            }
            setEvents(data);
        })
        .catch(error => {
            setErrorMessage(error.message);
        });
    }

    useEffect(()=>{
        refreshListEvent();
    },[]);

    const modifiedDate=new Date(selectedDate);
    modifiedDate.setDate(modifiedDate.getDate()+2);
    const currentTime= useState(new Date().toTimeString().slice(0,5));

    const createEvent=()=>{
        // alert("create Event: "+value.duration_type+" "+value.type+" "+value.selected_date+" "+selectedDate.toLocaleDateString('en-CA')+" "+value.duration_time);
        fetch(variables.API_URL+"event/",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title: value.title,
                type: value.type,
                selected_date: value.selected_date || selectedDate.toLocaleDateString('en-CA'),
                description: value.description,
                duration_type: value.duration_type,
                duration_time: value.duration_type ? value.duration_time || `${modifiedDate.toISOString().slice(0, 10)}T${currentTime}` : null,
                repeat_event: value.repeat_event,
                repeat_type: value.repeat_type,
            }),
        })
        .then((response)=>{
            response.json();
            refreshListEvent();
        })
        .then((data)=>{
            // alert("Created Successfully...! "+data);
            setNotify({ type: 'success', message: "Created Successfully...!" });
            handleCloseModel();
            refreshListEvent();
        })
        .catch((error)=>{
            console.log(error.message);
            setErrorMessage(error.message);
            setNotify({ type: 'error', message: error.message });
            refreshListEvent();
        })
        refreshListEvent();
    }

    const updateEvent=(evt)=>{
        // alert("update Event: "+value.title+" "+value.type);
        fetch(variables.API_URL+"event/"+evt.id,{
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title: value.title,
                type: value.type,
                selected_date: value.selected_date || selectedDate.toLocaleDateString('en-CA'),
                description: value.description,
                duration_type: value.duration_type,
                duration_time: value.duration_time,
                repeat_event: value.repeat_event,
                repeat_type: value.repeat_type,
            }),
        })
        .then((response)=>{
            response.json();
            refreshListEvent();
        })
        .then((data)=>{
            // alert("Updated Successfully...! "+JSON.stringify(data));
            setNotify({ type: 'success', message: "Updated Successfully...!" });
            handleCloseModel();
            refreshListEvent();
        })
        .catch((error)=>{
            console.log(error.message);
            setErrorMessage(error.message);
            refreshListEvent();
        })
    }

    const deleteEvent=()=>{
        // alert("delete: "+value.id+" "+value.title);
        fetch(variables.API_URL+"event/"+value.id,{
            method:"DELETE",
        })
        .then((response)=>{
            response.json();
        })
        .then((data)=>{
            // alert("Deleted Successfully...! "+JSON.stringify(data));
            setNotify({ type: 'success', message: "Deleted Successfully...!" });
            handleCloseModel();
            refreshListEvent();
        })
        .catch((error)=>{
            console.log(error.message);
            setNotify({ type: 'error', message: error.message });
            refreshListEvent();
        })
        refreshListEvent();
    }

    const eraseEvent=()=>{
        // alert("delete: "+events);
        fetch(variables.API_URL+"event/",{
            method: "DELETE",
        })
        .then((response)=>{
            response.json();
        })
        .then((data)=>{
            // alert("Erased Data Completed...!"+JSON.stringify(data));
            setNotify({ type: 'success', message: "Erased Data Completed...!" });
            handleCloseModel();
            refreshListEvent();
        })
        .catch((error)=>{
            // alert(error.message);
            setNotify({ type: 'error', message: error.message });
            console.log(error.message);
            refreshListEvent();
        })
        refreshListEvent();
    }

    const renderCalendar=()=>{
        const totalDays=new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const firstDay=new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const numberOfWeeks = Math.ceil((totalDays+firstDay)/7);
        const days=[];
        let day=1;
        for(let i=0;i<numberOfWeeks;i++) 
        {
            const val=[];
            for (let j=0;j<7;j++) 
            {
                if ((i === 0 && j<firstDay) || day>totalDays) 
                {
                    val.push(<td className='empty-cell' key={`${i}-${j}`} aria-disabled="true"/>);
                } 
                else 
                {
                    const curr=day;
                    val.push(
                        <td key={curr} className='day' onClick={()=>handleDateClick(curr)}>{curr}</td>
                    );
                    day++;
                }
            }
            days.push(<tr key={i}>{val}</tr>);
        }
        return days;
    }

    const getRepeatType=(num)=>{
        switch (num) 
        {
            case '0':
                return 'Every Monthly';
            case '1':
                return 'Every Weekly';
            case '2':
                return 'Every Monday';
            case '3':
                return 'Every Tuesday';
            case '4':
                return 'Every Wednesday';
            case '5':
                return 'Every Thursday';
            case '6':
                return 'Every Friday';
            case '7':
                return 'Every Saturday';
            case '8':
                return 'Every Sunday';
            default:
                return '';
        }
    };

    return (
        <>
            <CustomNotify type={notify.type} message={notify.message} />
            <h1>Calendar</h1>
            <div className='calendar-container'>
                <Row className="calendar-header">
                    <Col xs={2}>
                        <Button className="rounded-circle float-start" variant='outline-primary' onClick={prevMonth}>
                            <FontAwesomeIcon icon={Icons.faChevronLeft} />
                        </Button>
                    </Col>
                    <Col xs={5}>
                        <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    </Col>
                    <Col xs={2}>
                        <Button className="rounded-circle float-end" variant='outline-primary' onClick={nextMonth}>
                            <FontAwesomeIcon icon={Icons.faChevronRight} />
                        </Button>
                    </Col>
                    <Col xs={3}>
                        <Button className="rounded-circle float-end" variant='primary' onClick={handleCreate}>
                            <FontAwesomeIcon icon={Icons.faAdd} />
                        </Button>
                    </Col>
                </Row>
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
                    <tbody className='text-center'>
                        {renderCalendar()}
                    </tbody>
                </Table>
                <>
                    <div className='float-start'>
                        Total <strong>{events.length}</strong> items
                    </div>
                    <div className='float-end'>
                        <Button variant="danger" onClick={()=>handleAllDelete(events)}>Delete All</Button>
                    </div>
                </>
                <br/><br/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Selected Date</th>
                            <th>Description</th>
                            <th>Duration Type</th>
                            <th>Duration Time</th>
                            <th>Repeat Event</th>
                            <th>Repeat Type</th>
                            <th>Date Creation</th>
                            <th>Date Updation</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {errorMessage ? (
                            <tr>
                                <td colSpan="12">{errorMessage}</td>
                            </tr>
                        ) : (
                            events.map(event => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.title}</td>
                                <td>{event.type}</td>
                                <td><CustomDate dateString={event.selected_date}/></td>
                                <td>{event.description}</td>
                                <td>{event.duration_type ? 'Yes' : 'No'}</td>
                                <td><CustomDateTime dateString={event.duration_time}/></td>
                                <td>{event.repeat_event ? 'Yes' : 'No'}</td>
                                <td>{getRepeatType(event.repeat_type)}</td>
                                <td><CustomDateTime dateString={event.date_creation}/></td>
                                <td><CustomDateTime dateString={event.date_updation}/></td>
                                <td>
                                    <Button variant='primary' className="rounded-circle" onClick={() => handleEdit(event)}>
                                        <FontAwesomeIcon icon={Icons.faEdit} />
                                    </Button>
                                    {'   '}
                                    <Button variant='danger' className="rounded-circle" onClick={() => handleDelete(event)}>
                                        <FontAwesomeIcon icon={Icons.faTrash} />
                                    </Button>
                                </td>
                            </tr>
                            )))
                        }
                    </tbody>
                </Table>
            </div>
            {showModal ?(
                <>
                    <CalForm 
                        showModal={showModal}
                        crud={crud}
                        value={value}
                        handleClose={handleCloseModel}
                        selectedDate={selectedDate}
                        errorMessage={errorMessage}
                        create={()=>createEvent(value)}
                        update={()=>updateEvent(value)}
                        remove={()=>deleteEvent(value)}
                        erase={()=>eraseEvent(value)}
                        setValue={setValue}
                        repeatBy={()=>getRepeatType(value.repeat_type)}
                    />
                </>
            ):null}
        </>
    );
};
export default MyCalendar;