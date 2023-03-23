import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/assignments" element={<Login />}></Route>
          <Route path="/grades" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
