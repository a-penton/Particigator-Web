import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState} from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import AdminList from './AdminList';
import './Home.css';
import axios from "axios";


// Component with home page with welcome screen and options
function Home() {

	const {loggedIn, setLoggedIn} = useContext(LoginContext);
	const [name, setName] = useState('');
	const navigate = useNavigate();
	
	useEffect(() => {
		const fetchData = async () => {
			//const data = {email: localStorage.getItem('item')};
		
			let api = 'http://localhost:3001'; 
			const response = await axios.get(`${api}/admin/${localStorage.getItem('email')}`)
				.then(response => {
					if (response.status === 201 || response.status === 304) {
						setName(response.data.name);
						return response;
					}
				})
				.catch(error => {
					console.log(error.response.message);
					setName("Instructor");
				});
				return response.data.name;
			}
			fetchData();
			setLoggedIn(localStorage.getItem('loggedIn'));
			if (!localStorage.getItem('loggedIn')) {
				navigate("/login");
			}
	}, [])  

	return (
		<div className="home-page">
			<NavBar />
			<h1>Welcome, {name}!</h1>
			<h4>What would you like to do today?</h4>
			<div className="buttons">
				<button className="home-button" onClick={() => {navigate('/assignments')}}>Assignments</button>
				<br />
				<br />
				<button className="home-button" onClick={() => {navigate('/grades')}}>Grades</button>
				<br />
				<br />
				<button className="home-button" onClick={() => {navigate('/students')}}>Students</button>
			</div>
			<br />
		</div>
	)
}

export default Home;
