import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Catalog from './components/Catalog';
import Create from './components/Create';
import Details from './components/Details';
import Edit from './components/Edit';
import { auth } from './firebase-config';  // Import your firebase auth
import { useEffect, useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            // Unsubscribe when the component is unmounted
            unsubscribe();
        };
    }, []);

    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/create" element={<Create />} />
                <Route path="/details/:id" element={<Details user={user} />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </>
    );
}

export default App;