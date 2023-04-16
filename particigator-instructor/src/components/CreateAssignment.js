import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import React, {useState, useContext, useEffect} from 'react';
import NavBar from './NavBar';
import { API } from "../API";

const postNewQuestion = async (data) => {
	return await API.postNewQuestion(data);
}

function CreateAssignment() {

	const navigate = useNavigate();
	const {loggedIn} = useContext(LoginContext);

	const [questionTitle, setQuestionTitle] = useState("");
	const [question, setQuestion] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [incorrectAnswer1, setIncorrectAnswer1] = useState("");
	const [incorrectAnswer2, setIncorrectAnswer2] = useState("");
	const [incorrectAnswer3, setIncorrectAnswer3] = useState("");
	const [imagePath, setImagePath] = useState("14KeEfpHRFnQFoqb5zixvecFTk07zqT0Y");
	const [explanation, setExplanation] = useState("");
	const [passcode, setPasscode] = useState("");

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

		postNewQuestion({
			questionTitle: questionTitle,
			question: question,
			// TODO: Simplify this, randomize on the frontend
			// So we will only need answers, no id/option
			options: [
				{id: "0", option: "A", answer: correctAnswer},
				{id: "1", option: "B", answer: incorrectAnswer1},
				{id: "2", option: "C", answer: incorrectAnswer2},
				{id: "3", option: "D", answer: incorrectAnswer3}
			],
			correctAnswerIndex: 0,
			imagePath: imagePath,
			explanation: explanation,
			passcode: passcode
		});
		setQuestionSubmitted(true);
	}

	function handleQuestionTitleChange(event) {
		setQuestionTitle(event.target.value);
	}
	function handleQuestionChange(event) {
		setQuestion(event.target.value);
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
	function handleImagePathChange(event) {
		setImagePath(event.target.value);
	}
	function handleExplanationChange(event) {
		setExplanation(event.target.value);
	}
	function handlePasscodeChange(event) {
		setPasscode(event.target.value);
	}

	return (
		<div>
			<NavBar />
			<h1>Create Assignment</h1>
			<form className="login-form" onSubmit={submitAssignment}>
			<div className="form-group">
					<label htmlFor="Title">Assignment Title: </label>
					<input 
						type="text"
						name="Title"
						value={questionTitle}
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
				<div className="form-group">
					<label htmlFor="Image Path">Image ID: </label>
					<input
						type="text"
						name="Image Path"
						value={imagePath}
						placeholder="Enter image ID here!"
						onChange={handleImagePathChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Explanation">Explanation: </label>
					<input
						type="text"
						name="Explanation"
						value={explanation}
						placeholder="Enter explanation here!"
						onChange={handleExplanationChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Passcode">Passcode: </label>
					<input
						type="text"
						name="Passcode"
						value={passcode}
						placeholder="Enter passcode here!"
						onChange={handlePasscodeChange}
					/>
				</div>
				<button>Add this Assignment!</button>
        	</form>
		</div>
	)
}

export default CreateAssignment;
