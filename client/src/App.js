import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Home from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import Profile from './Pages/Profile/Profile';
import Friends from './Pages/Friends/Friends';
import FriendRequests from './Pages/Friend Requests/FriendRequests';


const App = () => {


    
    return(
        <BrowserRouter>
        <Box>
            <Routes>
                <Route path='/' exact element={ <Home /> } /> 
                <Route path='/auth' exact element={ <Auth /> } />
                <Route path='/user/:id' element={ <Profile /> } />
                <Route path='/friends' element={ <Friends /> } />
                <Route path='/friendrequest' element={ <FriendRequests /> } />
            </Routes>   
        </Box>
        </BrowserRouter>
    );
}

export default App;