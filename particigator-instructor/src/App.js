import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react'
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Grades from './components/Grades';
import Assignments from './components/Assignments';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/assignments" element={<Assignments loggedIn={loggedIn} />} />
          <Route path="/grades" element={<Grades loggedIn={loggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
