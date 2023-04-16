import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import Header from './Header.js';
import './Login.css';
import { API } from "../API";
import axios from "axios";

const postNewAdmin = async (data) => {
	return await API.postNewAdmin(data);
}

function Signup() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);
  // set up page navigation
  const navigate = useNavigate();
  // set up states for form entries
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [formData, setFormData] = useState({
		name: '',
		email: '',
    password: '',
	});

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn')) {
      navigate("/");
    }
  }, [])  

  function handleNameChange(event) {
    setName(event.target.value);
    setFormData({
			...formData,
			name: event.target.value
		});
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
  }
  function handlePassword2Change(event) {
    setPassword2(event.target.value);
    setFormData({
			...formData,
			password: event.target.value
		});
  }

  // TODO: check email/password against backend
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {email: formData.email, password: formData.password, name: formData.name};
  
    let api = 'http://localhost:3001'; 
    const response = await axios.post(`${api}/admin`, {
      data}
    ).then(response => {
      if (response.status === 201) {
        // Redirect to new screen
        window.alert("Account created!");
        navigate("/");
      }
    })
    .catch(error => {
      alert(error.response.data.message);
    });
  }

  // have to return nested divs to center it on the page
  return (<>
    <Header />
    <div className="login-page">
      <div className="welcome">
        <h3>Welcome to Particigator!</h3>
        <h4>Create an account</h4>
        <form className="login-form" onSubmit={handleSubmit}>
		  <input 
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
			      required
          />
          <br />
          <input 
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
			      required
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
            pattern='.{8,}'
            title="Password must be at least 8 characters long"
            required
          />
		  <br />
		  <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            onChange={handlePassword2Change}
            pattern={password}
            title="Passwords must match"
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  </>)
}

export default Signup;
