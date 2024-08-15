import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registro';
import Home from './pages/Home';
import NavBar from './components/NavBar'
import Post from './pages/Post';
import NewPost from './pages/NewPost';
import PostInfo from './pages/PostInfo';
import MyPost from './pages/MyPost';
import Planes from './pages/Planes';
import Pelis from './pages/Pelis';
import ProtectedRoute from './components/ProtectedRoute';
import { TokenContext } from './Context/TokenContext';

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

function Main() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
    const { token } = useContext(TokenContext);

    return (
        <>
            {!hideNavbar && <NavBar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<ProtectedRoute isAuthenticated={token} element={<Post/>}/>}/>
                <Route path="/posts/:id" element={ <ProtectedRoute isAuthenticated={token} element={<PostInfo />} /> } />
                <Route path="/my-posts/:id" element={<ProtectedRoute isAuthenticated={token} element={<MyPost />} /> } />
                <Route path="/new-post" element={<ProtectedRoute isAuthenticated={token} element={<NewPost />} /> } />
                <Route path="/planes" element={<ProtectedRoute isAuthenticated={token} element={<Planes />} /> } />
                <Route path="/peliculas" element={<ProtectedRoute isAuthenticated={token} element={<Pelis />} /> } />
                {/* Otras rutas */}
            </Routes>
        </>
    );
}

export default App;