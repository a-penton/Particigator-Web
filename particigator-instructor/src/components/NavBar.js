import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { LoginContext } from '../LoginContext';
import logo from '../assets/particigator-logo.svg';
import "./NavBar.css";


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
      <div className="left">
				<img src={logo} className="logo" alt="logo" />
        <h3>Particigator</h3>
			</div>
      <div className="center links">
        <Link to="/">Home</Link>
        <Link to="/assignments">Assignments</Link>
        <Link to="/grades">Grades</Link>
        <Link to="/students">Students</Link>
      </div>
      <div className="right">
        <Link className="logout" onClick={logout}>Sign out</Link>
      </div>
    </div>
  )

  // return (
  //   <div className = "navbar">
  //     <div className="left">
	// 			<img src={logo} className="logo" alt="logo" />
	// 		</div>
  //     <div className = "links">
  //     <img src={logo} className="logo" alt="logo" />
  //         <Link to="/">Home</Link>
  //         <Link to="/assignments">Assignments</Link>
  //         <Link to="/grades">Grades</Link>
  //         <Link to="/students">Students</Link>
  //         <button onClick={logout}>Log out</button>
  //     </div>
  //   </div>
  // )
}

export default NavBar;