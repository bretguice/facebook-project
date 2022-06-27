import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import {  GoogleOAuthProvider } from '@react-oauth/google';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';


const App = () => {
    
    return(
        <BrowserRouter>
        <Box>

            <GoogleOAuthProvider clientId='636139791510-22pas2t4lphqs4ue4pd6icuade3pqt5r.apps.googleusercontent.com' >
            <Routes>
                <Route path='/' exact element={ <Home /> } /> 
                <Route path='/auth' exact element={ <Auth />} />
                <Route path='/user/:id' element={ <Profile />} />
            </Routes>   
            </GoogleOAuthProvider> 
        </Box>
        </BrowserRouter>
    );
}

export default App;