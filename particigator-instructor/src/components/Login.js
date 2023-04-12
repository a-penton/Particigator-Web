import React, {useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import './Login.css';
import { API } from "../API";

const checkAdminCredentials = async (data) => {
	return await API.checkAdminCredentials(data);
}

function Login() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);

  // set up states for email/password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
		email: '',
    password: '',
	});
  const [actualPassword, setActualPassword] = useState("");

  if (loggedIn) {
    return <Navigate to="/" />
  }

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
    const response = await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      // Redirect to new screen
      setLoggedIn(true);
    } else {
      // Handle login failure
      alert('Invalid username or password');
    }
  };
  

    // console.log(password)
    // console.log(actualPassword)
    // if(actualPassword === password){
    //   setLoggedIn(true);
    //   localStorage.setItem("loggedIn", true);
    //   console.log(actualPassword);
    // }
    // else {
    //   window.alert("Incorrect credentials. Please try again.");
    // }


  

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
