import React, { useState, useEffect }from 'react';
import { useDispatch } from 'react-redux';
import { Box, Stack } from '@mui/material';


import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import LeftBar from '../LeftBar/LeftBar';
import RightBar from '../RightBar/RightBar';
import Navbar from '../Navbar/Navbar';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

  return (
    <Box >
        <Navbar />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        <Stack direction='row'spacing={2} justifyContent='space-between' >
            <LeftBar />
            <Posts setCurrentId={setCurrentId} />
            <RightBar />
        </Stack>
    </Box>

  )
}

export default Home