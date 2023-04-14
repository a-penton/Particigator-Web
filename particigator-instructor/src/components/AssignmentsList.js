import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from "../API";
import "./AssignmentsList.css"

const fetchAssignments = async () => {
  return await API.getAllQuestions();
}

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  function edit(assignment) {
    // TODO: For this to work, need to get answer data when fetching assignments
    // TODO: alternative would be to get info by id in EditAssignment.js
    navigate('/editAssignment', { state: assignment });
  }

  function copy(assignment) {
    // confirm they want to duplicate the assignment
    const confirmation = window.confirm('Duplicating assignment ' + assignment.questionTitle + '.');
    if (!confirmation) {
      return;
    }

    // TODO: duplicate the assignment in the backend

    // navigate to this page so it reloads and it shows up
    // TODO: check this works, otherwise will have to location.reload() to refresh
    navigate('/assignments');
  }

  function erase(assignment) {
    // confirm they want to delete the assignment
    const confirmation = window.confirm('Deleting assignment ' + assignment.questionTitle + '.');
    if (!confirmation) {
      return;
    }
    
    // TODO: remove the assignment from the database

    // reload this page so changes are displayed
    // TODO: check this works, may have to use location.reload() instead
    navigate('/assignments');
  }
  
  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      <div className="assignments">
        {assignments !== null ? 
          assignments.map((assignment) => {
            return (
              <div className="assignment" key={assignment.questionTitle}>
                <div className="assignment_title">{assignment.questionTitle}</div>
                <div className="assignment_buttons">
                  <button className="action" onClick={() => copy(assignment)}>copy</button>
                  <button className="action" onClick={() => edit(assignment)}>edit</button>
                  <button className="action" onClick={() => erase(assignment)}>delete</button>
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
