import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Catalog from './components/Catalog';
import Create from './components/Create';
import Details from './components/Details';

function App() {
   
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />}>
                
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path='/create' element={<Create />}/>
                <Route path="/details/:id" element={<Details />} />
            </Routes>

            
        </>
    )
}

export default App
