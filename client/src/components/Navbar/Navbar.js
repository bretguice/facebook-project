import React, { useState } from 'react';
import { useNavigate,  Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Box, Badge, InputBase, Typography, Menu, MenuItem } from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';
import UserAvatar from "../UserAvatar/UserAvatar";
import { selectAuth } from '../../features/selectors';
import { StyledToolbar, StyledBox, Search, Icons, UserBox } from './styles';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const Navbar = () => {

  const [ open, setOpen ] = useState(false);
  const authUser = useSelector(selectAuth);
  const currentUser = useSelector((state) => state.users.userList.find((u) => u._id === authUser._id));

  const navigate = useNavigate();
  
    const logout = () => {
        localStorage.clear();
        navigate('/auth');
    };
  
    return (
    <AppBar position='sticky'>
        <StyledToolbar>
          <Link to='/' style={{textDecoration: 'none'}}>
            <StyledBox >
              <ElectricBoltIcon />
              <Typography variant='h6' sx={{ display:{ xs:'none', sm:'block'}}}>odinbook</Typography>
            </StyledBox>
          </Link>
            {/* <Search><InputBase placeholder='search...' /></Search> */}
            <Icons>
                <Badge badgeContent={4} color='error'>
                    <Mail /> 
                </Badge>
                <Badge badgeContent={4} color='error'>
                    <Notifications /> 
                </Badge> 
                <Box onClick={(e) => setOpen(true)}> 
                  <UserAvatar sx={{ width: 30, height:30 }} user={currentUser} ></UserAvatar>
                </Box>   
            </Icons>
            <UserBox onClick={(e) => setOpen(true)}>
              <UserAvatar sx={{ width: 30, height:30 }} user={currentUser} ></UserAvatar>
                <Typography variant='span'>{currentUser.firstName} </Typography>
            </UserBox>
        </StyledToolbar>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Link to={`/user/${currentUser._id}`} >
          <MenuItem >Profile</MenuItem>
        </Link>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar