import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { LoginContext } from '../LoginContext';
import "./NavBar.css"


function NavBar() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);
  const navigate = useNavigate();

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    navigate("/login");
  }

  return (
    <div className = "navbar">
        <div className = "links">
            <Link to="/">Home</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/grades">Grades</Link>
            <button onClick={logout}>Log out</button>
        </div>
    </div>
  )
}

export default NavBar;