import { useState, useEffect } from 'react';
import { API } from "../API";
import GradesTable from './GradesTable.js';
import "./GradeBook.css"

const fetchUsers = async (instructor) => {
  return await API.getInstructorUsers(instructor);
}
const fetchQuestions = async (instructor) => {
  return await API.getInstructorQuestions(instructor);
}

const fetchGrades = async (instructor) => {
	return await API.getGrades(instructor);
}

// Component showing all grades of students with the logged in instructor, houses table
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
        const data = await fetchQuestions(localStorage.getItem('email'));
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
      // get grades data
      try {
        const gradesData = await fetchGrades(localStorage.getItem('email'));
        // console.log(gradesData);
        setGrades(gradesData);
        setIsLoading(false);
        console.log('btw grades is', gradesData)
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
        <GradesTable grades={grades} questions={questions} students={users} />
      </div>
    </div>
  );
}
    
export default GradeBook;
