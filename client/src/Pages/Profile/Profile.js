import React, { useEffect, useState }from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { Box, Button, Stack, Modal, Typography, TextField, Paper } from '@mui/material';
import Posts from '../../components/Posts/Posts';
import Navbar from '../../components/Navbar/Navbar';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { getUserById, updateUser } from '../../features/asyncThunk'
import { selectAuth } from '../../features/selectors';
import ProfileBar from './ProfileBar';

const Profile = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.users.userList.find((u) => u._id === id));
    const authUser = useSelector(selectAuth);
    const currentUser = useSelector((state) => state.users.userList.find((u) => u._id === authUser._id));
    const userDataObj = { firstName: user.firstName, lastName: user.lastName, 
        email: user.email, profilePicture: user.profilePicture };
    const [userData, setUserData] = useState(userDataObj);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
         const { name, value } = e.target
        setUserData({...userData, [name]: value })
    };

    const handleModal = () => {
        if(openModal === true){
            setOpenModal(false);
        } else { 
            setOpenModal(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(updateUser({ userData, profileId: id }));
        dispatch(getUserById(id));
        handleModal();
        
    };

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);
    
  return (
    <Box >
    <Navbar currentUser={currentUser}  />
    <Box m='auto' width="100%">
        <Stack  direction='row' flex={2} height={'15%'}>
            <UserAvatar  height={'150px'} width={'150px'} user={user} />
            <ProfileBar  handleEdit={handleModal} currentUser={currentUser} id={id} authUser={authUser} user={user}  />
        </Stack>
    </Box>
        <Stack direction='column' flex={1} width={'50%'} justifyContent='center' >
    <Box width='80%' m='auto' >
        <Modal open={openModal} onClose={handleModal}>
            <Paper>
                <form onSubmit={handleSubmit} >
                    <Typography variant='h6'>Edit Profile Information</Typography>
                    <TextField variant='outlined' name='firstName' onChange={(e) => handleChange(e)} value={userData.firstName} ></TextField>
                    <TextField name='lastName' onChange={(e) => handleChange(e)} value={userData.lastName} ></TextField>
                    <TextField name='email' onChange={(e) => handleChange(e)} value={userData.email} ></TextField>
                    <div className='fileInput'>
                        <FileBase type='file' multiple={false} onDone={({base64}) => setUserData(userData =>({ ...userData, profilePicture: base64}))}/>
                    </div>
                    <Button type='submit' variant='contained'>Submit</Button>
                </form>
            </Paper>
        </Modal>
        <Posts  />
    </Box>
    </Stack>
</Box>
  )
}

export default Profile