import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/assignments" element={<Home />}></Route>
          <Route path="/grades" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
