import { useState, useEffect } from 'react';
import { API } from "../API";
import "./QuestionsList.css"

const fetchQuestions = async () => {
  return await API.getAllQuestions();
}

const QuestionsList = () => {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      <div className="questions">
        {questions !== null ? 
          questions.map((question) => {
            return (
              <div className="question" key={question.id}>
                <div className="question_text">{question.text}</div>
                <div className="question_buttons">
                  <button className="action">copy</button>
                  <button className="action">edit</button>
                  <button className="action">delete</button>
                </div>
              </div>
            )
          }) : null
        }
      </div>
    </div>
  );
  }
    
    export default QuestionsList;