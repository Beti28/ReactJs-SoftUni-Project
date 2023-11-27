import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import './register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const onRegister = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!validateEmail(registerEmail)) {
      setEmailError('Invalid email format');
    }

    if (!validatePassword(registerPassword)) {
      setPasswordError('Password must be at least 6 characters long');
    }

    if (registerPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
    }

    if (validateEmail(registerEmail) && validatePassword(registerPassword) && registerPassword === confirmPassword) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );

        console.log(user);
        navigate('/');
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div id="register-page">
      <div className="registerForm">
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => setRegisterEmail(event.target.value)}
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setRegisterPassword(event.target.value)}
            />
            {passwordError && <span className="error">{passwordError}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}
          </div>

          <button type="button" className='btnregister' onClick={onRegister}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

