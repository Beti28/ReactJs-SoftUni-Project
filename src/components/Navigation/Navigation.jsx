import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './navigation.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useEffect, useState } from 'react';


const Navigation = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      // Unsubscribe when the component is unmounted
      unsubscribe();
    };
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      window.location.pathname = "/";
    });
  };

  return (
    
    <Nav className='nav-bar'>
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>
      <Nav.Link as={Link} to="/about">About</Nav.Link>
      {!user ? (
        <>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <span>Hello, Guest</span>
        </>
      ) : (
        <>
          <Nav.Link as={Link} to="/create">Create</Nav.Link>
          <Nav.Link as={Link} onClick={logout}>Sign Out</Nav.Link>
          <span>Hello, {user.email}</span>
        </>
      )}
    </Nav>
    
  );
};

export default Navigation;
