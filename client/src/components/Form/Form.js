import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@mui/material';

import { createPost, updatePost } from '../../features/asyncThunk';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null);
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({ ...postData, creator: currentUser, name: currentUser?.result?.name }));
        } else {
            dispatch(updatePost({ ...postData, name: currentUser?.result?.name }));
        }
        clear()
    }

    const clear = () =>{
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });

    }

    if(!currentUser?.result?.lastName){
        return(
            <Paper className={'paper'}>
                <Typography variant='h6'align='center'>
                    Please log in to create and like posts
                </Typography>
            </Paper>
        )
    }
 
    return (
        <Paper className='paper'>
            <form autoComplete='off' noValidate className={`${'root'} ${'form'}`} onSubmit={() => dispatch(createPost({ ...postData, creator: currentUser, name: currentUser?.result?.name }))}>
                <TextField sx={{ borderRadius: '50px' }} name='message' variant='outlined' label={`What's on your mind, ${currentUser.result.firstName}?`} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <div className='fileInput'>
                    <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedImg: base64})}/>
                </div>
                <Button className={'buttonSumbit'} style={{justifyContent: 'center'}} variant='contained' color='primary' size='small' type='submit' >Submit</Button>
            </form>
        </Paper>
    )
}

export default Form;