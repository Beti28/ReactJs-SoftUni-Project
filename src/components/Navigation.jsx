import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import'./navigation.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useEffect, useState } from 'react';

const Navigation = () => {
    const[isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [user, setUser] = useState("");

    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                setUser(authUser)
            }else{
                setUser("")
            }
        });
    },[user])
    const logout = () =>{
        signOut(auth).then(()=>{
            localStorage.clear()
            setIsAuth(false)
            window.location.pathname = "/"
        })
    }
    return (
        
                    <Nav className='nav-bar'> 
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>
                        {!user? <>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <span>Hello, Guest</span>
                        </>
                        :
                        <>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} onClick={logout}>Sign Out</Nav.Link>
                        <span>Hello, {user.email}</span>
                        </>}
                    </Nav>
             
        
    );
};

export default Navigation;
