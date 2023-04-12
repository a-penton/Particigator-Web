import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import React, {useState, useContext, useEffect} from 'react';
import NavBar from './NavBar';
import AssignmentsList from './AssignmentsList';

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
			<button onClick={() => {navigate('/createAssignment')}}>Create an Assignment</button>
		</div>
	)
}

export default Assignments;
