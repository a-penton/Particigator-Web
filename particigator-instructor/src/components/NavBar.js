import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { LoginContext } from '../LoginContext';
import logo from '../assets/particigator-logo.svg';
import "./NavBar.css";


function NavBar() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname == '/') {
      setCurrent('home');
    }
    else if (['/assignments', '/editAssignment', '/createAssignment'].includes(window.location.pathname)) {
      setCurrent('assignments');
    }
    else if (window.location.pathname == '/grades') {
      setCurrent('grades');
    }
    else if (window.location.pathname == '/students') {
      setCurrent('students');
    }
	}, [])

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  }

  return (
    <div className = "navbar">
      <div className="left">
				<img src={logo} className="logo" alt="logo" />
        <h3>Particigator</h3>
			</div>
      <div className="center links">
        <Link className={(current === 'home' ? "current " : "") + "navlink"} to="/">Home</Link>
        <Link className={(current === 'assignments' ? "current " : "") + "navlink"} to="/assignments">Assignments</Link>
        <Link className={(current === 'grades' ? "current " : "") + "navlink"} to="/grades">Grades</Link>
        <Link className={(current === 'students' ? "current " : "") + "navlink"} to="/students">Students</Link>
      </div>
      <div className="right">
        <Link className="logout" onClick={logout} to="/login">Sign out</Link>
      </div>
    </div>
  )
}

export default NavBar;