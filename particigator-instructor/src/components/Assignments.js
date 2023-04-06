import { Navigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import React, {useState, useContext} from 'react';
import NavBar from './NavBar';
import QuestionsList from './QuestionsList';
import { API } from "../API";

const postNewQuestion = async (data) => {
	return await API.postNewQuestion(data);
}

function Assignments() {

	const {loggedIn} = useContext(LoginContext);
	const [question, setQuestion] = useState("");
  	const [id, setQuestionID] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [incorrectAnswer1, setIncorrectAnswer1] = useState("");
	const [incorrectAnswer2, setIncorrectAnswer2] = useState("");
	const [incorrectAnswer3, setIncorrectAnswer3] = useState("");
	const [formData, setFormData] = useState({
		text: '',
		id: '',
	});

	const [questionSubmitted, setQuestionSubmitted] = useState(false)
	

	function submitAssignment(event) {
		event.preventDefault();

		postNewQuestion(formData);
		setQuestionSubmitted(true);
	}

	function handleQuestionChange(event) {
		setQuestion(event.target.value);
		setFormData({
			...formData,
			text: event.target.value
		});
	}

	function handleQuestionIDChange(event) {
		setQuestionID(event.target.value);
		setFormData({
			...formData,
			id: event.target.value
		});
		
	}

	function handleCorrectAnswerChange(event) {
		setCorrectAnswer(event.target.value);
	}

	function handleIncorrectAnswer1Change(event) {
		setIncorrectAnswer1(event.target.value);
	}

	function handleIncorrectAnswer2Change(event) {
		setIncorrectAnswer2(event.target.value);
	}

	function handleIncorrectAnswer3Change(event) {
		setIncorrectAnswer3(event.target.value);
	}

	if (!loggedIn) {
		return <Navigate to="/login" />
	}

	if (questionSubmitted) {
		return <Navigate to="/grades" />
	  }

	return (
		<div>
			<NavBar />
			<h1>Assignments Page</h1>
			<QuestionsList/>
			<form className="login-form" onSubmit={submitAssignment}>
				<input 
					type="text"
					name="Question"
					value={question}
					placeholder="Enter question here!"
					onChange={handleQuestionChange}
				/>
				<br />
				<input 
					type="text"
					name="ID"
					value={id}
					placeholder="Enter question ID here!"
					onChange={handleQuestionIDChange}
				/>
          		<br />
				<input
					type="text"
					name="Correct Answer Choice"
					value={correctAnswer}
					placeholder="Enter correct answer here!"
					onChange={handleCorrectAnswerChange}
				/>
				<br />
				<input
					type="text"
					name="Incorrect Answer Choice #1"
					value={incorrectAnswer1}
					placeholder="Enter incorrect answer #1 here!"
					onChange={handleIncorrectAnswer1Change}
				/>
				<br />
				<input
					type="text"
					name="Incorrect Answer Choice #2"
					value={incorrectAnswer2}
					placeholder="Enter incorrect answer #2 here!"
					onChange={handleIncorrectAnswer2Change}
				/>
				<br />
				<input
					type="text"
					name="Incorrect Answer Choice #3"
					value={incorrectAnswer3}
					placeholder="Enter incorrect answer #3 here!"
					onChange={handleIncorrectAnswer3Change}
				/>
				<br />
				<br />
				<button>Add an Assignment!</button>
        	</form>
		</div>
	)
}

export default Assignments;
