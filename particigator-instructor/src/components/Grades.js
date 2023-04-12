import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import UsersList from './UsersList';

function Grades() {

	const {loggedIn, setLoggedIn} = useContext(LoginContext);
	const navigate = useNavigate();

	useEffect(() => {
		setLoggedIn(localStorage.getItem('loggedIn'));
		if (!localStorage.getItem('loggedIn')) {
			navigate("/login");
		}
	}, [])

	return (
		<div>
			<NavBar />
			<h1>Grades Page</h1>
			<UsersList />
		</div>
	)
}

export default Grades;
