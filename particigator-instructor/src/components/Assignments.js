import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import React, {useState, useContext} from 'react';
import NavBar from './NavBar';
import QuestionsList from './QuestionsList';

function Assignments() {

	const navigate = useNavigate();
	const {loggedIn} = useContext(LoginContext);

	if (!loggedIn) {
		navigate('/login');
	}

	return (
		<div>
			<NavBar />
			<h1>Assignments Page</h1>
			<QuestionsList/>
			<br />
			<button onClick={() => {navigate('/createAssignment')}}>Create an Assignment</button>
		</div>
	)
}

export default Assignments;
