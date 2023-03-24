import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react'
import { LoginContext } from './LoginContext';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Grades from './components/Grades';
import Assignments from './components/Assignments';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/grades" element={<Grades />} />
          </Routes>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
