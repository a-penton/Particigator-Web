import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import { LoginContext } from './LoginContext';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Grades from './components/Grades';
import Assignments from './components/Assignments';
import CreateAssignment from './components/CreateAssignment';
import EditAssignment from './components/EditAssignment';
import EditStudents from './components/EditStudents';

// App component runs main application
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('loggedIn')){
      setLoggedIn(true)
    }
  }, [])

  // Returns Router wrapped in LoginContext.Provider to navigate between screens
  return (
    <div className="App">
      <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/createAssignment" element={<CreateAssignment />} />
            <Route path="/editAssignment" element={<EditAssignment />} />
            <Route path="/students" element={<EditStudents />} />
          </Routes>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
