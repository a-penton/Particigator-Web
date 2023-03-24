import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';

function Grades() {

	const {loggedIn} = useContext(LoginContext);

	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<div>
			<NavBar />
			<h1>Grades Page</h1>
		</div>
	)
}

export default Grades;
