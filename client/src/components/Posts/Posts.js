import React, { useEffect } from 'react';
import { Box, Grid} from '@mui/material';
import Post from './Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers } from '../../features/asyncThunk';
import Form from '../Form/Form';

const Posts = ({ currentId, setCurrentId }) => {
    const posts = useSelector((state) => state.posts.posts);
    
    const dispatch = useDispatch();
    
    useEffect(() =>{
        dispatch(getPosts())
        dispatch(getUsers())
    },[dispatch])

    return (
        <Box 
        flex={4} 
        p={2} 
        className='container' container  alignItems='stretch' spacing={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Box>
    )
}

export default Posts;