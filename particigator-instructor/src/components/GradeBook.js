import { useState, useEffect } from 'react';
import { API } from "../API";
import "./GradeBook.css"

const fetchUsers = async () => {
  return await API.getAllUsers();
}
const fetchQuestions = async () => {
  return await API.getAllQuestions();
}

const GradeBook = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      // get user data
      try {
        const data = await fetchUsers();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
      // get assignment data
      try {
        const data = await fetchQuestions();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
      // TODO: get grades data
    };
    fetchData();
  }, []);
  
  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      <div className="Tabling">
        <table>
          <thead>
            <tr>
              <th><button>Download CSV</button></th>
              {questions !== null ? 
                questions.map((question) => {
                  return (
                    <th key={question.questionTitle}>{question.questionTitle}</th>
                  )
                }) : null
              }
            </tr>
          </thead>
          <tbody>
            {users !== null ? 
              users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    {/* TODO: add grades here */}
                  </tr>
                )
              }) : null
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
    
export default GradeBook;
