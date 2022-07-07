import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import { friendRequest } from '../../features/asyncThunk';
 
const RightBar = ({currentUser, authUser}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const handleFriendRequest = ({currentUser, id}) => {
        dispatch(friendRequest({currentUser, id}));
    }

  return (
    <Box 
    flex={1} 
    p={1} 
    sx={{ display: { xs: 'none', sm: 'flex'}}} >
       <Box position='fixed'>
           <Button onClick={() => handleFriendRequest({ currentUser, id })}>Add Friend</Button> 
           {/* {(currentUser === id && 
           {(!currentUser.friends.include(id) || currentUser.friends.length === 0 || !currentUser.friendRequest.include(id))}) ?
        : null } */}
          
        </Box>
    </Box>
  )
}

export default RightBar