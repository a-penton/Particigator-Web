import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import UsersList from './UsersList';

function Assignments({loggedIn}) {
	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<div>
			<NavBar />
			<h1>Assignments Page</h1>
			<UsersList />
		</div>
	)
}

export default Assignments;
