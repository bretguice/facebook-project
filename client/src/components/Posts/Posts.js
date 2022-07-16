import React from 'react';
import { Box, Grid} from '@mui/material';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Form from '../Form/Form';

const Posts = () => {
    const postList = useSelector((state) => state.posts.postList);
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const screenSize = mobile ? {width: '100%'} : {width: '50%'};
    return (
        <Box 
        flex={1} 
        p={1} 
        sx={screenSize} 
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