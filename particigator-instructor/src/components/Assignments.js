import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import QuestionsList from './QuestionsList';

function Assignments() {

	const {loggedIn} = useContext(LoginContext);

	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<div>
			<NavBar />
			<h1>Assignments Page</h1>
			<QuestionsList/>
		</div>
	)
}

export default Assignments;
