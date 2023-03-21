import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      {/* The commented code causes the app to stop working */}
      {/* <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/assignments" element={<Home />}></Route>
          <Route path="/grades" element={<Home />}></Route>
        </Routes>
      </Router> */}
      {/* For now, I am just using the navbar as this works on its own */}
      <NavBar />
    </div>
  );
}

export default App;
