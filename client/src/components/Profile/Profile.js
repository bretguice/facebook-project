import React, { useState }from 'react';
import { Box, Stack } from '@mui/material';

import Posts from '../Posts/Posts';
import LeftBar from '../LeftBar/LeftBar';
import RightBar from '../RightBar/RightBar';
import Navbar from '../Navbar/Navbar';

function Profile() {

    const [currentId, setCurrentId] = useState(0);
    
  return (
    <Box >
    <Navbar  />
    <Stack direction='row'spacing={2} justifyContent='space-between' >
        <LeftBar />
        <Posts setCurrentId={setCurrentId} currentId={currentId} />
        <RightBar />
    </Stack>
</Box>
  )
}

export default Profile