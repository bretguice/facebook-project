import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Stack, Card, CardMedia, CardActionArea, CardContent } from '@mui/material'
import Navbar from '../../components/Navbar/Navbar';
import LeftBar from '../../components/LeftBar/LeftBar';
import noAvatar from '../../img/noAvatar.png'
import { getUserById } from '../../features/asyncThunk';
import Loading from '../../components/Loading/Loading';

const Friends = () => {
    const authUser = useSelector((state) => state.auth.authData.result);
    const currentUser = useSelector((state) => state.users.userList.find((user) => user._id === authUser._id));
    const userFriendList = useSelector((state) => state.users.userList.filter(({_id}) => currentUser.friends.includes(_id)));
    const loading = useSelector((state) => state.users.loading);
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUserById(currentUser._id))
  },[dispatch, currentUser._id])

  return (
    <Box>
        <Navbar currentUser={currentUser} />
        <Stack direction='row'spacing={2} justifyContent='space-between' >
          <LeftBar currentUser={currentUser} />
          <Stack direction='column' spacing={2}flex={2}  alignItems='center' justifyContent='center' >
          <Typography variant='h3' >Friends</Typography>
          <Stack direction='row' spacing={2} justifyContent='space-between'>
        {(currentUser.friends.length > 0) ?
          userFriendList.map((friend) => {
          return(
          <div key={friend._id}>
              <Link to={`/user/${friend._id}`}>
              <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                      <CardMedia
                      component="img"
                      height="220"
                      image={friend.profilePicture ? friend.profilePicture : noAvatar}
                      alt={`${friend.firstName} ${friend.lastName}`}
                      />
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      {`${friend.firstName} ${friend.lastName}`}
                      </Typography>
                  </CardContent>
              </CardActionArea>
          </Card>
          </Link>  
          </div>
      )}) : 
      <Typography variant='h4'>No friends</Typography>
  }
      </Stack>
    </Stack>
  </Stack>
  <Loading loading={loading} />
</Box>
  )
}

export default Friends;