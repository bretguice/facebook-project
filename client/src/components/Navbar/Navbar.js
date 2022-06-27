import React, { useState, useEffect } from 'react';
import { useNavigate,  Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { AppBar, Box, Badge, InputBase, Typography } from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UserAvatar from "../UserAvatar/UserAvatar";
import { StyledToolbar, StyledBox, Search, Icons, UserBox } from './styles';

const Navbar = ( {currentUser, setCurrentUser} ) => {

  const [ open, setOpen ] = useState(false);
  const navigate = useNavigate();
  
    const logout = () => {
        localStorage.clear();
        navigate('/auth');
        setCurrentUser(null);
    };

    useEffect(() => {
      const token = currentUser?.token;
      console.log(token)

        if (token) {
            const decodedToken = decode(token);
            console.log(decodedToken.exp)
            const date = new Date().getTime()
            console.log(date)
            if (decodedToken.exp * 1000 < new Date().getTime( )) logout();
        }

        setCurrentUser(JSON.parse(localStorage.getItem('user')));

    }, [])
  
    return (
    <AppBar position='sticky'>
        <StyledToolbar>
          <Link to='/' style={{textDecoration: 'none'}}>
            <StyledBox >
              <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiN1bmRlZmluZWQ7Ij48bGluZWFyR3JhZGllbnQgaWQ9IkxkNnNxcnRjeE15Y2tFbDZ4ZURkTWFfdUxXVjVBOXZYSVB1X2dyMSIgeDE9IjkuOTkzIiB4Mj0iNDAuNjE1IiB5MT0iOS45OTMiIHkyPSI0MC42MTUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyYWE0ZjQiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDdhZDkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjTGQ2c3FydGN4TXlja0VsNnhlRGRNYV91TFdWNUE5dlhJUHVfZ3IxKSIgZD0iTTI0LDRDMTIuOTU0LDQsNCwxMi45NTQsNCwyNHM4Ljk1NCwyMCwyMCwyMHMyMC04Ljk1NCwyMC0yMFMzNS4wNDYsNCwyNCw0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNi43MDcsMjkuMzAxaDUuMTc2bDAuODEzLTUuMjU4aC01Ljk4OXYtMi44NzRjMC0yLjE4NCwwLjcxNC00LjEyMSwyLjc1Ny00LjEyMWgzLjI4M1YxMi40NiBjLTAuNTc3LTAuMDc4LTEuNzk3LTAuMjQ4LTQuMTAyLTAuMjQ4Yy00LjgxNCwwLTcuNjM2LDIuNTQyLTcuNjM2LDguMzM0djMuNDk4SDE2LjA2djUuMjU4aDQuOTQ4djE0LjQ1MiBDMjEuOTg4LDQzLjksMjIuOTgxLDQ0LDI0LDQ0YzAuOTIxLDAsMS44Mi0wLjA4NCwyLjcwNy0wLjIwNFYyOS4zMDF6Ij48L3BhdGg+PC9zdmc+" height={40} width={40}/>
              <Typography variant='h6' sx={{ display:{ xs:'none', sm:'block'}}}>odinbook</Typography>
            </StyledBox>
          </Link>
            <Search><InputBase placeholder='search...' /></Search>
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
        <Link to={`/user/${currentUser.id}`} >
          <MenuItem >Profile</MenuItem>
        </Link>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar