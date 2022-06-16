import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@mui/material';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.find((message) => message._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        clear()
       
    }

    const clear = () =>{
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });

    }

    if(!user?.result?.name){
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
            <form autoComplete='off' noValidate className={`${'root'} ${'form'}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name='title' variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name='message' variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name='tags' placeholder='seperate tags by commas' variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.trim().split(',') })}/>
                <div className='fileInput'>
                    <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedImg: base64})}/>
                </div>
                <Button className={'buttonSumbit'} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;