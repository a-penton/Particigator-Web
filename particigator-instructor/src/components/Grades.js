import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import GradeBook from './GradeBook';

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
			<h1>Grades</h1>
			<GradeBook />
		</div>
	)
}

export default Grades;
