import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import './Login.css';
import axios from "axios";


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
      console.log('logged in, going to home')
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

  // TODO: check email/password against backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = 'http://localhost:3001'; 
    const response = await axios.post(`${api}/login`, {
      params: { email: email, password: password }}
    ).then(response => {
      if (response.status === 200) {
        // Redirect to new screen
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        navigate("/");
      }
    })
    .catch(error => {
      alert(error.response.data.message);
    });
  };
  
  // have to return nested divs to center it on the page
  return (
    <div className="login-page">
      <div className="welcome">
        <h3>Welcome to Particigator!</h3>
        <h4>Sign in to get started</h4>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  )
}

export default Login;
