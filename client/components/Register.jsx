import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
  const [confirmReg, setConfirmReg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    studio: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //FETCH FROM DB
  const handleRegister = () => {
    fetch('/api/creators/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        // setUser(...newAccountInfo);
        console.log('SUCCESSFULLY CREATED NEW USER!!LOG IN NOW!!');
      })
      .then((res) => {
        setUser({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          studio: '',
        });
        setConfirmReg('Thank you for registering, you can now log in.');
        setErrors({}); //resetting error state if it was successful
      })
      .catch((err) => {
        console.error(
          'An error occurred while POSTING new user info: ',
          err
        );
      });
  };

  return (
    <div style={{ width: '60vw' }}>
      <h1 className="m-5 card-text">Register</h1>
      {confirmReg ? (
        <h4 className="card-text" style={{ color: 'green' }}>
          {confirmReg}
        </h4>
      ) : null}
      <form onSubmit={handleRegister} className="m-5">
        {errors.username ? (
          <span className="error-text card-text">
            {errors.username.message}
          </span>
        ) : null}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="username"
            className="form-control card-text"
            placeholder="Place title here"
            value={user.username}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="username" className="form-label card-text">
            Username
          </label>
        </div>

        {errors.email ? (
          <span className="error-text card-text">{errors.email.message}</span>
        ) : null}
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control card-text"
            placeholder="Place email here"
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor="username" className="form-label card-text">
            E-mail
          </label>
        </div>

        {errors.password ? (
          <span className="error-text card-text">
            {errors.password.message}
          </span>
        ) : null}
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control card-text"
            placeholder="Place email here"
            value={user.password}
            onChange={handleChange}
          />
          <label htmlFor="password" className="form-label card-text">
            Password
          </label>
        </div>

        {errors.confirmPassword ? (
          <span className="error-text card-text">
            {errors.confirmPassword.message}
          </span>
        ) : null}
        <div className="form-floating mb-3">
          <input
            type="password"
            name="confirmPassword"
            className="form-control card-text"
            placeholder="Place email here"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword" className="form-label card-text">
            Confirm Password
          </label>
        </div>

        {errors.studio ? (
          <span className="error-text card-text">{errors.studio.message}</span>
        ) : null}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="studio"
            className="form-control card-text"
            placeholder="Place email here"
            value={user.studio}
            onChange={handleChange}
          />
          <label htmlFor="studio" className="form-label card-text">
            Studio Name
          </label>
        </div>

        <div className="center">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
