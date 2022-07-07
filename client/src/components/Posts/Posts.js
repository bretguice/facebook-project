import React from 'react';
import { Box, Grid} from '@mui/material';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import Form from '../Form/Form';

const Posts = () => {
    const postList = useSelector((state) => state.posts.postList);

    return (
        <Box 
        flex={4} 
        p={2} 
        className='container' container  alignItems='stretch' spacing={3}>
            <Form />
            {(postList) ? 
            postList.slice(0).reverse().map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} >
                        <Post post={post} />
                    </Grid>
                )) : null }
            </Box>
    )
}

export default Posts;