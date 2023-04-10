import React, {useState, useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import './Login.css';
import { API } from "../API";

const postNewAdmin = async (data) => {
	return await API.postNewAdmin(data);
}

function Signup() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);

  // set up states for email/password
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [formData, setFormData] = useState({
		name: '',
		email: '',
    password: '',
	});
  // set up history for page navigation
  const navigate = useNavigate();

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
  function handleNameChange(event) {
    setName(event.target.value);
    setFormData({
			...formData,
			name: event.target.value
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
  function handleSubmit(event) {
    event.preventDefault();
    // const email = event.target.email.value;
	  // const name = event.target.name.value;
    // const password = event.target.password.value;
	// the form automatically verifies that the passwords match

    // TODO: check email not already associated with an account
	// if it is, we'll do something like this:
	// window.alert("Error: This email is already associated with an account.");
	// setEmail("");
	// setName("");
	// setPassword("");
	// setPassword2("");
	

	// TODO: otherwise, create the account & add to database
    postNewAdmin(formData);
    window.alert("Account created!");
    navigate("/");
  }

  // have to return nested divs to center it on the page
  return (
    <div className="login-page">
      <div className="welcome">
        <h3>Welcome to Particigator!</h3>
        <h4>Create an account</h4>
        <form className="login-form" onSubmit={handleSubmit}>
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
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
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
  )
}

export default Signup;
