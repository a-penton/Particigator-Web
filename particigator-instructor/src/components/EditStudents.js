import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../LoginContext';
import NavBar from './NavBar';
import './EditStudents.css';

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
	}, [])  

	function handleFileUpload(event) {
		setFile(event.target.files[0]);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (file) {
			const reader = new FileReader();
			reader.onload = async (event) => {
				const csvData = event.target.result;
				const lines = csvData.split(/\r?\n/);
				setData(lines.map((line) => line.split(',')));
				// TODO: Upload data to backend
				// data is an array of rows
				// each row is [studentID, sectionNumber]

				// console.log(data);
				// note data isn't immediately updated by setData for some reason,
				// so this might log null/undefined
			};
			reader.readAsText(file);
		}
		else {
			alert('Error: No file selected');
		}
	}

	function download() {
		if (data == undefined) {
			alert('No data to download!');
			return;
		}
		const csvData = data.map(row => row.join(',')).join('\n');
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
						<th>Section</th>
					</tr>
				</thead>
				<tbody>
					{data.map(row =>
					// Each row is [studentID, section#]
						<tr key={row[0]}>
							<td>{row[0]}</td>
							<td>{row[1]}</td>
						</tr>
						)
					}
				</tbody>
			</table> : <h4>No Data</h4>
			}
			<br />

		</div>
	)
}

export default EditStudents;
