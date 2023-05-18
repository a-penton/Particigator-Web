import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import React, {useState, useContext, useEffect} from 'react';
import NavBar from './NavBar';
import { API } from "../API";
import './EditAssignment.css';

const postNewQuestion = async (data) => {
	return await API.postNewQuestion(data);
}

// Component allowing instructor to edit assignment, not yet implemented with backend (5/17/2023)
function EditAssignment() {

	// get props from AssignmentList when we navigated here
	const state = useLocation().state;

	const navigate = useNavigate();
	const {loggedIn} = useContext(LoginContext);

	const [title, setQuestionTitle] = useState(state.questionTitle);
	const [question, setQuestion] = useState(state.question);
	const [correctAnswer, setCorrectAnswer] = useState(state.options[0].answer);
	const [incorrectAnswer1, setIncorrectAnswer1] = useState(state.options[1].answer);
	const [incorrectAnswer2, setIncorrectAnswer2] = useState(state.options[2].answer);
	const [incorrectAnswer3, setIncorrectAnswer3] = useState(state.options[3].answer);
	const [formData, setFormData] = useState({
		text: '',
		title: '',
	});

	const [questionSubmitted, setQuestionSubmitted] = useState(false)

	useEffect(() => {
		if (!localStorage.getItem('loggedIn')) {
			navigate('/login');
		}
		if (questionSubmitted) {
			navigate('/assignments');
		}
	});

	function submitAssignment(event) {
		event.preventDefault();

		// TODO: Modify this to only edit the assignment
		postNewQuestion(formData);
		setQuestionSubmitted(true);
	}

	function handleQuestionTitleChange(event) {
		setQuestionTitle(event.target.value);
		setFormData({
			...formData,
			title: event.target.value
		});
		
	}
	function handleQuestionChange(event) {
		setQuestion(event.target.value);
		setFormData({
			...formData,
			text: event.target.value
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

	return (
		<div>
			<NavBar />
			<h1>Edit Assignment</h1>
			<br />
			<form className="edit-assignment-form" onSubmit={submitAssignment}>
				<div className="form-group">
					<label htmlFor="Title">Assignment Title: </label>
					<input 
						type="text"
						name="Title"
						value={title}
						placeholder="Enter assignment title here!"
						onChange={handleQuestionTitleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Question">Question: </label>
					<input 
						type="text"
						name="Question"
						value={question}
						placeholder="Enter question here!"
						onChange={handleQuestionChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Correct Answer Choice">Correct Answer: </label>
					<input
						type="text"
						name="Correct Answer Choice"
						value={correctAnswer}
						placeholder="Enter correct answer here!"
						onChange={handleCorrectAnswerChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Incorrect Answer Choice #1">Incorrect answer: </label>
					<input
						type="text"
						name="Incorrect Answer Choice #1"
						value={incorrectAnswer1}
						placeholder="Enter incorrect answer #1 here!"
						onChange={handleIncorrectAnswer1Change}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Incorrect Answer Choice #2">Incorrect answer: </label>
					<input
						type="text"
						name="Incorrect Answer Choice #2"
						value={incorrectAnswer2}
						placeholder="Enter incorrect answer #2 here!"
						onChange={handleIncorrectAnswer2Change}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Incorrect Answer Choice #3">Incorrect answer: </label>
					<input
						type="text"
						name="Incorrect Answer Choice #3"
						value={incorrectAnswer3}
						placeholder="Enter incorrect answer #3 here!"
						onChange={handleIncorrectAnswer3Change}
					/>
				</div>
				<button>Submit Changes</button>
        	</form>
		</div>
	)
}

export default EditAssignment;
