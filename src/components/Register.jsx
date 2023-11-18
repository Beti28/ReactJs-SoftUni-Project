import'./register.css';
import dog3 from './dog3.jpg';

export default function Register() {
    return (
      <section id="register-page" className="content auth">
        <form id="register" className="registerForm">
          <div className="container">
            <div className="brand-logo"></div>
            <h1>Register</h1>
  
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
  
            <label htmlFor="pass">Password:</label>
            <input type="password" name="password" id="register-password" />
  
            <label htmlFor="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password" />
  
            <input className="btn submit" type="submit" value="Register" />
            <p >
                <img src={dog3} alt='' className="registerImg" />
            </p>
          </div>
        </form>
      </section>
    );
  }
