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

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState(null);
  const [active, setActive] = useState(-1);
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

  async function activate(title) {
    console.log('My Title' + title);
    if (title === -1 || title === null) {
      if (window.confirm("Deactivating " + active)) {
        // TODO: Deactivate current active assignment in the backend
        setActive(title);
        console.log(title);
        await activateAssignment(localStorage.getItem('email'), title);
      }
    }
    else {
      if (window.confirm(active == null ? "Activating " + title : "Deactivating " + active + " and activating " + title)) {
        // TODO: Activate this assignment in the backend
        setActive(title);
        console.log(title);
        await activateAssignment(localStorage.getItem('email'), title);
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
                    <button className="action" onClick={() => activate("")}><PowerSettingsNew /></button> :
                    <button className="action" onClick={() => activate(assignment.numID)}><PowerSettingsNew /></button>
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
