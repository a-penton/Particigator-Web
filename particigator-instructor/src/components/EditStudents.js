import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import axios from "axios";
import './EditStudents.css';
import { API } from "../API";

const fetchUsers = async () => {
	return await API.getAllUsers();
}

function EditStudents() {

	const {loggedIn, setLoggedIn} = useContext(LoginContext);
	const [file, setFile] = useState(null);
	const [data, setData] = useState(null); // student data - TODO: get from database
	const navigate = useNavigate();

	useEffect(() => {
		setLoggedIn(localStorage.getItem('loggedIn'));
		if (!localStorage.getItem('loggedIn')) {
			navigate("/login");
		}
		const fetchData = async () => {
			// get user data
			try {
			  const tempData = await fetchUsers();
			  console.log(tempData);
			  setData(tempData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [])  

	function handleFileUpload(event) {
		setFile(event.target.files[0]);
	}

	async function handleSubmit(event) {
		event.preventDefault();
    	let api = 'http://localhost:3001';
		let errors = ""; 
		let instructor = localStorage.getItem('email');
		if (file) {
			await axios.delete(`${api}/users/${instructor}`, {instructor: instructor})
				.then(response => {
					if (response.status === 201) {
						return;
					}
				})
				.catch(error => {
					errors += error.response.data.message + "\n"
			});
			const reader = new FileReader();
			
			reader.onload = async (event) => {
				const csvData = event.target.result;
				const asyncData = csvData.split(/\r?\n/);
				setData(asyncData);
				console.log(data);
				console.log(asyncData);
				if(asyncData !== null){
					for (var i = 0; i < asyncData.length; i++) { 
						console.log(asyncData[i]); 
						let student = {id: asyncData[i], instructor: localStorage.getItem('email')};
						await axios.post(`${api}/users`, {
							student}
						  ).then(response => {
							if (response.status === 201) {
							  return;
							}
						  })
						  .catch(error => {
							errors += error.response.data.message + "\n"
						  });
					}
					//setData(asyncData);
				}
				// TODO: Upload data to backend
				// data is an array of rows
				// each row is [studentID, sectionNumber]

				// console.log(data);
				// note data isn't immediately updated by setData for some reason,
				// so this might log null/undefined
			};
			reader.readAsText(file);
			window.alert("Data uploaded.");
			navigate("/");
        	// navigate("/students");
			//alert(errors);
		}
		else {
			alert('Error: No file selected');
		}
	}

	function download() {
		if (data === undefined) {
			alert('No data to download!');
			return;
		}
		const csvData = data.join('\n');
		const blob = new Blob([csvData], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "student_info.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	return (
		<div>
			<NavBar />
			<h1>Student Information</h1>
			<form className="student-file-form" onSubmit={handleSubmit}>
				<label>
					Upload Data
					<input className="student-file-input" type="file" onChange={handleFileUpload}></input>
				</label>
				<button type="submit">Upload csv</button>
			</form>
			<br />
			<button onClick={download}>Download data</button>
			<br />
			<h3>Current Data</h3>
			{data !== null ? 
			<table className="student-data-table">
				<thead>
					<tr>
						<th>Student</th>
					</tr>
				</thead>
				<tbody>
					{data.map(row => {
						// Each row is {id: studentID, instructor: email}
						console.log(row);
						return (
							<tr key={row.id}>
								<td>{row.id}</td>
							</tr>
						)
					})}
				</tbody>
			</table> : <h4>No Data</h4>
			}
			<br />

		</div>
	)
}

export default EditStudents;
