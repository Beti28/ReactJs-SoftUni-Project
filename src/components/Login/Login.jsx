// Login.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

export default function Login() {
  const { userLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [err, setErr] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onLogin = async (e) => {
    e.preventDefault();

    let valid = true;
    Object.values(err).forEach((e) => {
      if (e.length !== 0) {
        valid = false;
      }
    });
    if (!valid) {
      return;
    } else {
      userLogin(loginEmail, loginPassword).catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorMessage("Wrong password. Please try again.");
        }
      });
    }

    if (!validateForm()) {
      return;
    }

   
  };

  const validateForm = () => {
    // Simple email validation
    if (!loginEmail || !loginEmail.includes('@')) {
      toast.error('Invalid email address', { position: toast.POSITION.TOP_CENTER });
      return false;
    }

    // Simple password validation
    if (!loginPassword || loginPassword.length < 6) {
      toast.error('Password should be at least 6 characters', { position: toast.POSITION.TOP_CENTER });
      return false;
    }

    return true;
  };

  return (
    <div id="login-page">
      <div className="loginForm">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => setLoginEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setLoginPassword(event.target.value)}
            />
          </div>

          <button type="button" className="btnlogin" onClick={onLogin}>
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
