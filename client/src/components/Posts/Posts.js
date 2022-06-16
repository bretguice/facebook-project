import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, CircularProgress } from '@mui/material';

import Post from './Post/Post';
import SamplePost from './Post/SamplePost';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);


    return (
        //!posts.length ? <CircularProgress /> : (
            <Box 
            flex={4} 
            p={2} 
            className='container' container  alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
                <SamplePost />
                <SamplePost />
                <SamplePost />
                <SamplePost />
            </Box>
        //)
    )
}

export default Posts;