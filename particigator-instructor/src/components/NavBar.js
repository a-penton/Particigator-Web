import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"


function NavBar() {

  return (
    <div className = "navbar">
        <div className = "links">
            <Link to="/">Home</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/grades">Grades</Link>
        </div>
    </div>
  )
}

export default NavBar;