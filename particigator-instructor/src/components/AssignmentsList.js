import { useState, useEffect } from 'react';
import { API } from "../API";
import "./AssignmentsList.css"

const fetchAssignments = async () => {
  return await API.getAllQuestions();
}

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAssignments();
        setAssignments(data);
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
      <div className="assignments">
        {assignments !== null ? 
          assignments.map((assignment) => {
            return (
              <div className="assignment" key={assignment.id}>
                <div className="assignment_text">{assignment.text}</div>
                <div className="assignment_buttons">
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

export default AssignmentsList;
