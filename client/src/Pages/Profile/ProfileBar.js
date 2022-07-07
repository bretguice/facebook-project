import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, ListItemIcon, Stack } from '@mui/material';
import { Home, Person, AccountBox, PersonAdd, Edit, GroupAdd } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { friendRequest } from '../../features/asyncThunk';

const ProfileBar = ({user, currentUser, id, authUser, handleEdit}) => {
    const dispatch = useDispatch();

    const handleFriendRequest = ({currentUser, id}) => {
        dispatch(friendRequest({currentUser, id}));
    }

  return (
    <Box 
    p={1} 
    direction='row'
    position='sticky'
    >
        <Stack  direction="row" spacing={3} >
       <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
          <ListItem >
              <Link to={'/'}>
                <Stack direction='row'>
              <ListItemIcon>
                  <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
                </Stack>
              </Link>
          </ListItem>
          {(user._id !== authUser._id) ?
          <ListItem >
              <Link to={`/user/${authUser._id}`}>
              <Stack direction='row'>
              <ListItemIcon>
                  <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
              </Stack>
              </Link>
          </ListItem>
          : null }
          <ListItem >
              <Link to={'/friends'}>
              <Stack direction='row'>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
              </Stack>
              </Link>
          </ListItem>
          {(user._id === authUser._id) ?
          <>
          <ListItem >
            <Link to={'/friendrequest'}>
            <Stack direction='row'>
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText style={{textDecoration: 'none'}} primary= "Requests" />
              </Stack>
              </Link>
          </ListItem>
          <ListItem  onClick={handleEdit} style={{cursor: 'pointer'}}>
          <Stack direction='row'>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText  primary="Edit" />
              </Stack>
          </ListItem>
          </>
          : null }
           <ListItem onClick={() => handleFriendRequest({ currentUser, id })} style={{cursor: 'pointer'}} >
            <Stack direction='row'>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText style={{textDecoration: 'none'}} primary= "Add Friend" />
              </Stack>
          </ListItem>
        </List>
        </Stack>
    </Box>
  )
}

export default ProfileBar

