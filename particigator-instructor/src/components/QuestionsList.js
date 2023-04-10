import { useState, useEffect } from 'react';
import { API } from "../API";
import "./UsersList.css"

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
    <div className="Tabling">
        <table>
          <tr>
            <th>ID</th>
            <th>Question</th>
          </tr>
      {questions !== null ? 
        questions.map((question) => {
          return (
            <tr>
              <td>{question.id}</td>
              <td>{question.text}</td>
            </tr>
          )
        }) : null}
      </table>
    </div>
    </div>
  );
  }
    
    export default QuestionsList;