import React, { useState }from 'react';
import { Box, Stack } from '@mui/material';

import Posts from '../Posts/Posts';
import LeftBar from '../LeftBar/LeftBar';
import RightBar from '../RightBar/RightBar';
import Navbar from '../Navbar/Navbar';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem('user'))); 

  return (
    <Box >
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser}  />
        <Stack direction='row'spacing={2} justifyContent='space-between' >
            <LeftBar />
            <Posts currentUser={currentUser}  />
            <RightBar />
        </Stack>
    </Box>

  )
}

export default Home