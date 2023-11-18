import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import './register.css';
import dog3 from './dog3.jpg';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onRegister = async () => {
    try {
      if(registerPassword.length <6){
        alert("Password must be at least 6 characters long!");
      }
      if (registerPassword !== confirmPassword) {
        alert("Passwords don't match");
      }
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    navigate('/');
  };

  return (
    <div id="register-page">
      <div className="registerForm">
        <h1>Create User</h1>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => setRegisterEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setRegisterPassword(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <button type="button" className='btnregister' onClick={onRegister}>
            Create User
          </button>

          <div>
            <p>
              <img src={dog3} alt='' className="registerImg" />
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

