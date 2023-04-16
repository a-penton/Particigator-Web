import { useState, useEffect } from 'react';
import { API } from "../API";
import "./GradeBook.css"

const fetchUsers = async (instructor) => {
  return await API.getInstructorUsers(instructor);
}
const fetchQuestions = async () => {
  return await API.getAllQuestions();
}

const fetchGrades = async (instructor) => {
	return await API.getGrades(instructor);
}

const GradeBook = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [grades, setGrades] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      // get user data
      try {
			  const tempUsers = await fetchUsers(localStorage.getItem('email'));
			  if(tempUsers !== undefined || tempUsers !== null){
          console.log(tempUsers);
          setUsers(tempUsers);
			  }
			  else{
				  setUsers(null);
			  }
			} catch (error) {
				console.log(error);
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
      try {
        const gradesData = await fetchGrades(localStorage.getItem('email'));
        console.log(gradesData);
        setGrades(gradesData);
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
          <thead>
            <tr>
              <th><button className="download-grades">Download CSV</button></th>
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
