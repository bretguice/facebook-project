import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Paper } from '@mui/material';
import { createComment } from '../../features/asyncThunk';
import { selectAuth } from '../../features/selectors';

const Comment = ({post}) => {
    const authUser = useSelector(selectAuth);
    const currentUser = useSelector((state) => state.users.userList.find((u) =>u._id === authUser._id));
    const [postData, setPostData] = useState({ message: '', post: post._id, creator:currentUser._id, createdAt: new Date() });
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
            dispatch(createComment(postData));
            setPostData({ message: '', post:post._id, creator:currentUser._id, createdAt: new Date() });
            
        } catch (err) {
            console.log(err.message)
        }
        e.target.value = null;

    }

    return (
        <Paper className='paper'>
            <form autoComplete='off' noValidate className={`${'root'} ${'form'}`} onSubmit={(e) => handleSubmit(e)}>
                <TextField sx={{ borderRadius: '50px' }} name='message' variant='outlined' label={`What's on your mind, ${currentUser.firstName}?`} 
                fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <Button className={'buttonSumbit'} style={{justifyContent: 'center'}} variant='contained' color='primary' size='small' type='submit' >Submit</Button>
            </form>
        </Paper>
    )
}

export default Comment;