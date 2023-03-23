import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';

function Assignments({loggedIn}) {
	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<div>
			<NavBar />
			<h1>Assignments Page</h1>
		</div>
	)
}

export default Assignments;
