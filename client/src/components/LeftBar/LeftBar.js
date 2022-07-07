import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, ListItemIcon, Stack } from '@mui/material';
import { Home, Person, AccountBox, PersonAdd } from '@mui/icons-material';

const LeftBar = ({currentUser}) => {

  return (
    <Stack>
      <Box 
      bgcolor={'lightgray'}
      p={1}
      width={'15vw'}
      sx={{ display: { xs: 'none', sm: 'flex'}}}
      flex={1} 
      >
       <List>
          <ListItem disablePadding>
              <Link to={'/'}>
              <Stack direction='row'>
              <ListItemIcon>
                  <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
              </Stack>
              </Link>
          </ListItem>
          <ListItem disablePadding>
              <Link to={`/user/${currentUser._id}`}>
              <Stack direction='row'>
              <ListItemIcon>
                  <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
              </Stack>
              </Link>
          </ListItem>
          <ListItem disablePadding>
              <Link to={'/friends'}>
              <Stack direction='row'>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
              </Stack>
              </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to={'/friendrequest'}>
            <Stack direction='row'>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Friend Requests" />
              </Stack>
              </Link>
          </ListItem>
        </List>
        </Box>
          </Stack>
  )
}

export default LeftBar