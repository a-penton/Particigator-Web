import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import UsersList from './UsersList';

function Grades() {

	const {loggedIn} = useContext(LoginContext);

	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<div>
			<NavBar />
			<h1>Grades Page</h1>
			<UsersList />
		</div>
	)
}

export default Grades;
