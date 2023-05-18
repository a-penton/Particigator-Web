import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from "../API";
import { PowerSettingsNew, ContentCopy, Edit, Delete, Power } from '@mui/icons-material';
import "./AssignmentsList.css"

const fetchAssignments = async (instructor) => {
  return await API.getInstructorQuestions(instructor);
}

const activateAssignment = async (instructor, currAss) => {
	return await API.updateCurrAssignmentAdmin(instructor, currAss);
}

// Shows list of all assignments created by the logged in instructor
// Copy, edit, and delete currently NOT implemented yet (5/17/2023)
const AssignmentsList = () => {
  const [assignments, setAssignments] = useState(null);
  const [active, setActive] = useState(-1);
  const [activeName, setActiveName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Get current active assignment, or ""
    const fetchData = async () => {
      try {
        const data = await fetchAssignments(localStorage.getItem('email'));
        if(data == null){
          setAssignments(null);
        }
        else{
          setAssignments(data);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function edit(assignment) {
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

  async function activate(assignmentID, assignmentName) {
    console.log('My Title' + assignmentID);
    if (assignmentID === -1 || assignmentID === null) {
      if (window.confirm("Deactivating " + activeName)) {
        // TODO: Deactivate current active assignment in the backend
        setActive(assignmentID);
        setActiveName(assignmentName);
        console.log(assignmentID);
        await activateAssignment(localStorage.getItem('email'), assignmentID);
      }
    }
    else {
      if (window.confirm(active == -1 ? "Activating " + assignmentName : "Deactivating " + activeName + " and activating " + assignmentName)) {
        // TODO: Activate this assignment in the backend
        setActive(assignmentID);
        setActiveName(assignmentName)
        console.log(assignmentID);
        await activateAssignment(localStorage.getItem('email'), assignmentID);
      }
    }
  }
  
  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      <div className="assignments">
        {assignments !== null ? 
          assignments.map((assignment) => {
            return (
              <div className={assignment.numID == active ? "active assignment" : "assignment"} key={assignment.numID}>
                <div className="assignment_title">{assignment.questionTitle}</div>
                <div className="assignment_buttons">
                  {
                    assignment.numID == active ?
                    <button className="action" onClick={() => activate(-1, "")}><PowerSettingsNew /></button> :
                    <button className="action" onClick={() => activate(assignment.numID, assignment.questionTitle)}><PowerSettingsNew /></button>
                  }
                  <button className="action" onClick={() => copy(assignment)}><ContentCopy /></button>
                  <button className="action" onClick={() => edit(assignment)}><Edit /></button>
                  <button className="action" onClick={() => erase(assignment)}><Delete /></button>
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
