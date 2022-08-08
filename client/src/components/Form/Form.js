import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Paper } from '@mui/material';

import { createPost } from '../../features/asyncThunk';
import { selectAuth } from '../../features/selectors';

const Form = () => {
    const authUser = useSelector(selectAuth);
    const currentUser = useSelector((state) => state.users.userList.find((u) =>u._id === authUser._id));
    const [postData, setPostData] = useState({ message: '', creator:currentUser._id, selectedImg: [], createdAt: new Date() });
    const dispatch = useDispatch();

        const fileBase64 = (img) => {
            return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(img);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = error => reject(error);
            })
        }
        const handleImage = async (e) => {
            const image = e.target.files;
            console.log(image)
                Promise.all(Array.from(image).map( (img) => fileBase64(img)))
            .then((b64) => {
                console.log(b64);
                setPostData({...postData, selectedImg:[...postData.selectedImg, ...b64]});
            })
            .catch(err => console.log(err))
        }

    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
            dispatch(createPost(postData));
            setPostData({ message: '', creator:currentUser._id, createdAt: new Date(),  selectedImg: []});
            
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
                <div className='fileInput'>
                    <input type="file" multiple={true} onChange={handleImage} accept='.jpg, .jpeg, .png' />
                </div>
                <Button className={'buttonSumbit'} style={{justifyContent: 'center'}} variant='contained' color='primary' size='small' type='submit' >Submit</Button>
            </form>
        </Paper>
    )
}

export default Form;