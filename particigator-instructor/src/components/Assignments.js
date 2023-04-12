import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import React, {useState, useContext, useEffect} from 'react';
import NavBar from './NavBar';
import QuestionsList from './QuestionsList';

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
			<QuestionsList/>
			<br />
			<button onClick={() => {navigate('/editAssignment')}}>Create an Assignment</button>
		</div>
	)
}

export default Assignments;
