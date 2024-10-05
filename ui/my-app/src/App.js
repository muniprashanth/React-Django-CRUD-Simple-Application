import './App.css';
import './font.css';
import React, {useState,useEffect} from 'react';
import { Home } from './components/Home';
import Employee from './components/Employee/Employee';
import Department from './components/Department/Department';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import CustomLoader from './components/Loader/CustomLoader';
import Poll from './components/Poll/Poll';
import ReactCalendar from './components/Calendar/Calendar';
import MyCalendar from './components/Calendar/Cal';
import Login from './components/Auth/Login';
import CustomNotify from './components/Notify/CustomNotify';
const App=()=>{
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className='d-flex justify-content-center m-3'>
          React JS Frontend
        </h3>
        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/department">
                Department
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/employee">
                Employee
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/poll">
                  Poll
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/calendar">
                  Calendar
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/notify">
                  Notify
              </NavLink>
            </li>
          </ul>
        </nav>

        {loading ? (
          <CustomLoader/>
        ) : (
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/department' element={<Department/>} />
            <Route path='/employee' element={<Employee/>} />
            <Route path='/poll' element={<Poll/>} />
            <Route path='/calendar' element={<MyCalendar/>} />
            <Route path='/notify' element={<CustomNotify/>} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;