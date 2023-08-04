import React, { useState } from 'react';
// import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormControl, FormLabel } from 'react-bootstrap';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [resbody, setResBody] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/creators/login', {
      //send email and password in either query or param
      method: 'POST', //we are posting data to create cookie with JWT token inside then we expect confirmation that this user exists
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((userData) => userData.json()) //res is studioId
      .then((userData) => {
        //userData could be an error message
        // console.log(userData, 'SUCCESSFULLY Logged in!!');
        // we need creator id from userData. 
        // call use navigate passing along correct data on the state property. collect this data using uselocation in the router and pass as prop to desired component
        setIsAuthenticated(true);
        navigate('/', { state: { userData, }});
      })
      .catch((err) => {
        console.error('An error occurred while logging in: ', err);
      });
  };

  return (
 
    <div style={{width: '60vw'}}>
      <h1 className="m-5">Login</h1>
      <p className="error-text">{errorMessage ? errorMessage : ''}</p>
      <Form onSubmit={handleLogin} className="m-5">

        <div className="form-floating mb-3">
          <input
            type="text"
            name="email"
            className="form-control "
            placeholder="Place title here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
 
          />
          <label htmlFor="email" className="form-label">
                  Email
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Place title here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
 
          />
          <label htmlFor="password" className="form-label">
                  Password
          </label>
        </div>
      
        <div className="center">
          <Button type="submit">Sign In</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
