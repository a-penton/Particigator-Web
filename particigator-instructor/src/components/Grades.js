import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';

function Grades({loggedIn}) {
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
