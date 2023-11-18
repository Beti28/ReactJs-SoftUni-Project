import "./login.css"
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import dog4 from './dog4.jpg'

export default function Login() {
    const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser)
  })
  const onLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    navigate('/');
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
          <button type="button" className='btnlogin' onClick={onLogin}>
            Login
          </button>
          <div>
            <p>
              <img src={dog4} alt='' className="loginImg" />
            </p>
          </div>
          <div>
              <h4>User logged in:</h4>
              {user?.email}
          </div>
        </form>
      </div>
    </div>
    );
}
