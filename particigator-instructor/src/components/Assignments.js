import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import React, {useState, useContext, useEffect} from 'react';
import NavBar from './NavBar';
import AssignmentsList from './AssignmentsList';
import './Assignments.css';

function Assignments() {

	const navigate = useNavigate();
	const {loggedIn, setLoggedIn} = useContext(LoginContext);

	useEffect(() => {
		setLoggedIn(localStorage.getItem('loggedIn'))
		if (!localStorage.getItem('loggedIn')) {
			navigate("/login");
		}
	}, [])

	return (
		<div>
			<NavBar />
			<h1>Assignments Page</h1>
			<AssignmentsList />
			<br />
			<Link className="create-assignment" onClick={() => {navigate('/createAssignment')}}>Create New Assignment</Link>
		</div>
	)
}

export default Assignments;
