import React, { useState } from "react";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import dog4 from './dog4.jpg';
import "./login.css"

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    // Simple email validation
    if (!loginEmail || !loginEmail.includes("@")) {
      setError("Invalid email address");
      return false;
    }

    // Simple password validation
    if (!loginPassword || loginPassword.length < 6) {
      setError("Password should be at least 6 characters");
      return false;
    }

    return true;
  };

  const onLogin = async () => {
    if (!validateForm()) {
      return; // Do not proceed with login if validation fails
    }

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setError("Invalid email or password"); // Set a general error message for login failure
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}
