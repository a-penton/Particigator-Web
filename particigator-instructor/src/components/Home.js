import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';

function Home({loggedIn}) {
	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<div>
			<NavBar />
			<h1>Home Page</h1>
		</div>
	)
}

export default Home;
