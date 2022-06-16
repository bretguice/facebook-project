import React from 'react';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
 
const RightBar = () => {
  return (
    <Box 
    flex={1} 
    p={2} 
    sx={{ display: { xs: 'none', sm: 'block'}}} >
       <Box position='fixed'>
            <Typography variant='h6' fontWeight={100}>Friends</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary="Remy Sharp"
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary="Travis Howard"
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary="Cindy Baker"
            />
        </ListItem>
    </List>
        </Box>
    </Box>
  )
}

export default RightBar