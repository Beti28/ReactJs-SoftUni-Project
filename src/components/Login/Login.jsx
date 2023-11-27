import React, { useState, useEffect } from "react";
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./login.css";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define setUser function to handle the authenticated user
  const setUser = (user) => {
    // Your logic to handle the authenticated user
    // For example, you can set it to the state or take other actions
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once

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
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setError("Invalid email or password");
    }
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
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}
