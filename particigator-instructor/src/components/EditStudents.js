import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import './Home.css';

function EditStudents() {

	const {loggedIn, setLoggedIn} = useContext(LoginContext);
	const [file, setFile] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		setLoggedIn(localStorage.getItem('loggedIn'));
		if (!localStorage.getItem('loggedIn')) {
			navigate("/login");
		}
	}, [])  

	function handleFileUpload(event) {
		setFile(event.target.files[0]);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
			  const csvData = event.target.result;
			  const lines = csvData.split(/\r?\n/);
			  const data = lines.map((line) => line.split(','));
			  // TODO: Upload data to backend
			  // data is an array of rows
			  // each row is [studentID, sectionNumber]
			  //console.log(data);
			};
			reader.readAsText(file);
		}
	}

	return (
		<div>
			<NavBar />
			<h4>Upload Student Information</h4>
			<form onSubmit={handleSubmit}>
				<label>
					Load ur data
					<input type="file" onChange={handleFileUpload}></input>
				</label>
				<button type="submit">Upload csv</button>
			</form>
		</div>
	)
}

export default EditStudents;
