import React, {useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import Header from './Header.js';
import './Login.css';
import axios from "axios";

// Component allowing instructor to login
function Login() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);
  const navigate = useNavigate();

  // set up states for email/password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
		email: '',
    password: '',
	});
  const [actualPassword, setActualPassword] = useState("");

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn')) {
      navigate("/");
    }
  }, [])

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setFormData({
			...formData,
			email: event.target.value
		});
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setFormData({
			...formData,
			password: event.target.value
		});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = 'http://localhost:3001'; 
    const response = await axios.post(`${api}/login`, {
      params: { email: email, password: password }}
    ).then(response => {
      if (response.status === 200) {
        // Redirect to new screen
        setLoggedIn(true);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem("loggedIn", true);
        navigate("/");
      }
    })
    .catch(error => {
      alert(error.response.data.message);
    });
  };
  
  // have to return nested divs to center it on the page
  return (<>
    <Header />
    <div className="login-page">
      <div className="welcome">
        <h3>Sign in</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label"><p>Email</p></label>
          <input 
            className="login-input"
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <br />
          <label className="login-label"><p>Password</p></label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <br />
          <br />
          <button className="login-btn" type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  </>)
}

export default Login;
