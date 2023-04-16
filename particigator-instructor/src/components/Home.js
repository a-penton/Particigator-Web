import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import AdminList from './AdminList';
import './Home.css';

function Home() {

	const {loggedIn, setLoggedIn} = useContext(LoginContext);
	const navigate = useNavigate();

	useEffect(() => {
		setLoggedIn(localStorage.getItem('loggedIn'));
		if (!localStorage.getItem('loggedIn')) {
			navigate("/login");
		}
	}, [])  

	// TODO: get actual user's name from database
	const name = "Aman";

	return (
		<div className="home-page">
			<NavBar />
			<h1>Welcome, {name}!</h1>
			<h4>What would you like to do today?</h4>
			<div className="buttons">
				<button className="home-button to-assignments" onClick={() => {navigate('/assignments')}}>Assignments</button>
				<br />
				<br />
				<button className="home-button to-grades" onClick={() => {navigate('/grades')}}>Grades</button>
				<br />
				<br />
				<button className="home-button to-students" onClick={() => {navigate('/students')}}>Students</button>
			</div>
			<br />
			{/* <AdminList/> */}
		</div>
	)
}

export default Home;
