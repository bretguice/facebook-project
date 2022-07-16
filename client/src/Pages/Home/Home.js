import React from 'react';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import Posts from '../../components/Posts/Posts';
import LeftBar from '../../components/LeftBar/LeftBar';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  const authUser = useSelector((state) => state.auth.authData.result);
  const currentUser = useSelector((state) => state.users.userList.find((u) => u._id === authUser._id));

  return (
    <Box >
        <Navbar currentUser={currentUser} />
        <Stack direction='row' spacing={2}  justifyContent='space-between' >
            <LeftBar flex={1} currentUser={currentUser} />
            <Box flex={2}  m='auto' width="50%" justifyContent='flex-start'>
              <Posts width="200px"  currentUser={currentUser} />
            </Box>
        </Stack>
    </Box>

  )
}

export default Home