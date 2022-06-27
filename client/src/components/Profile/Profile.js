import React, { useState }from 'react';
import { Box, Button, Stack, Modal, Typography, TextField, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import LeftBar from '../LeftBar/LeftBar';
import RightBar from '../RightBar/RightBar';
import Navbar from '../Navbar/Navbar';
import UserAvatar from '../UserAvatar/UserAvatar';
import {updateUser} from '../../features/asyncThunk'
import UserModal from '../UserModal/UserModal';
import { useParams } from 'react-router-dom';

function Profile() {
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem('user'))); 
    const [currentId, setCurrentId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', profilePicture: ''});
    const dispatch = useDispatch();
    const { id } = useParams();
   
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    };

    const handleModal = () => {
        if(openModal === true){
            setOpenModal(false);
        } else {
            setOpenModal(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(updateUser(userData))
        
    };

    
  return (
    <Box >
    <Navbar  />
    <Stack direction='row'spacing={2} justifyContent='space-between' >
        <LeftBar />
        <Stack direction='column' >
            <div>
                <UserAvatar sx={{ width: 100, height: 100 }} user={currentUser} />
                <Button style={{justifyContent: 'center'}} variant='contained' onClick={handleModal} >Edit Profile</Button>
            </div>
            <Modal open={openModal} color onClose={handleModal}>
                <Paper>
                    <form onSubmit={handleSubmit} >
                        <Typography variant='h6'>Edit Profile Information</Typography>
                        <TextField variant='outlined' name='first name' handleChange={handleChange} value={currentUser.result.firstName} ></TextField>
                        <TextField name='last name' handleChange={handleChange} value={currentUser.result.lastName} ></TextField>
                        <TextField name='email' handleChange={handleChange} value={currentUser.result.email} ></TextField>
                        <div className='fileInput'>
                            <FileBase type='file' multiple={false} onDone={({base64}) => setUserData({ ...userData, profilePicture: base64})}/>
                        </div>
                        <Button type='submit' variant='contained'>Submit</Button>
                    </form>
                </Paper>
            </Modal>
            <Posts setCurrentId={setCurrentId} currentId={currentId} />
        </Stack>
        <RightBar />
    </Stack>
</Box>
  )
}

export default Profile