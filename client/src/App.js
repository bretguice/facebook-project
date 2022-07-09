import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import PrivateRoute from './PrivateRoute';
import Home from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import Profile from './Pages/Profile/Profile';
import Friends from './Pages/Friends/Friends';
import FriendRequests from './Pages/Friend Requests/FriendRequests';
import { useSelector } from 'react-redux';
import { selectAuth, selectToken } from './features/selectors';
import decode from 'jwt-decode';

const App = () => {
    const [isLogged, setIsLogged] = useState(false);
    const authUser = useSelector(selectAuth);
    const token = useSelector(selectToken);

    useEffect(() => {
 
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 10000 < new Date().getTime( )) {
                localStorage.clear();
                setIsLogged(false);
            } else {
                setIsLogged(true);
            }
        } else {
            setIsLogged(false);
        }

    }, [setIsLogged, token])

    return(
        <BrowserRouter>
        <Box>
            <Routes>
                <Route exact element={ <PrivateRoute isLogged={isLogged} /> } > 
                    <Route path='/' exact element={ <Home /> } />
                </Route>
                <Route path='/auth' exact element={ <Auth /> } />
                <Route exact element={ <PrivateRoute isLogged={isLogged} /> } > 
                    <Route path='/user/:id' element={ <Profile /> } />
                </Route>
                <Route exact element={ <PrivateRoute isLogged={isLogged} /> } > 
                    <Route path='/friends' element={ <Friends /> } />    
                </Route>
                <Route exact element={ <PrivateRoute isLogged={isLogged} /> } > 
                    <Route path='/friendrequest' element={ <FriendRequests /> } />   
                </Route>
            </Routes>   
        </Box>
        </BrowserRouter>
    );
}

export default App;