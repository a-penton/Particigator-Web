import React, {useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import './Login.css';

function Login() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);

  // set up states for email/password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loggedIn) {
    return <Navigate to="/" />
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // TODO: check email/password against backend
  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    // placeholder check
    if (password === "Aman") {
      // navigate to home page
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
    }
    else {
      // TODO: incorrect login message
    }
  }

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
        <p>Don't have an account? <a href="/">Sign Up</a></p>
      </div>
    </div>
  )
}

export default Login;
