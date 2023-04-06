import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import AdminList from './AdminList';

function Home() {

	const {loggedIn} = useContext(LoginContext);

	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<div>
			<NavBar />
			<h1>Home Page</h1>
			<AdminList/>
		</div>
	)
}

export default Home;
