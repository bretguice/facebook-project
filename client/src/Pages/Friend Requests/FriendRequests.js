import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { declineFriend, acceptFriend, getUserById } from '../../features/asyncThunk';
import { Box, Button, Stack, Typography, Card, CardMedia, CardActionArea, CardContent } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import noAvatar from '../../utils/img/noAvatar.png';
import LeftBar from '../../components/LeftBar/LeftBar';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const FriendRequests = () => {
    const authUser = useSelector((state) => state.auth.authData.result);
    const currentUser = useSelector((state) => state.users.userList.find((user) => user._id === authUser._id));
    const userFriendReq = useSelector((state) => state.users.userList.filter(({_id}) => currentUser.friendRequest.includes(_id)));
    const loading = useSelector((state) => state.users.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserById(currentUser._id))
    },[dispatch, currentUser._id])

    const handleAcceptFriend = ({currentUser, friend}) => {
        dispatch(acceptFriend({currentUser, friend}));
        // Navigate back home so user doesn't have to wait for api call.  
        navigate('/');
    };

    const handleRejectFriend = ({currentUser, friend}) => {
        dispatch(declineFriend({currentUser, friend}));
        // Navigate back home so user doesn't have to wait for api call.  
         navigate('/');
    };

  return (
    <Box>
        <Navbar currentUser={currentUser} />
        <Stack direction='row'spacing={2} justifyContent='space-between' >
            <LeftBar currentUser={currentUser} />
            <Stack direction='column' flex={2} spacing={2} alignItems='center' justifyContent='center'>
            <Typography variant='h3'>Friend Requests</Typography>
            <Stack direction='row' spacing={2} justifyContent='space-between'>
            {(currentUser.friendRequest.length > 0) ?
            userFriendReq.map((friend) => {
                return(
                    <Box key={friend._id}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="220"
                                image={friend.profilePicture ? friend.profilePicture : noAvatar }
                                alt={`${friend.firstName} ${friend.lastName}`}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {`${friend.firstName} ${friend.lastName}`}
                                </Typography>
                                    <Button color='primary' onClick={() => handleAcceptFriend({ currentUser, friend })}>Confirm</Button>
                                    <Button color='secondary' onClick={() => handleRejectFriend({ currentUser, friend })}>Delete</Button>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                )
            }): 
            <Typography variant='h4'>No friend requests</Typography>
        }
                </Stack>
            </Stack>
        </Stack>
        <Loading loading={loading} />
    </Box>
  )
}

export default FriendRequests