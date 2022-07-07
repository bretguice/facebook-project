import React from 'react';
import {Avatar} from '@mui/material';
import noAvatar from '../../img/noAvatar.png';

const UserAvatar = ({ user, height, width }) => {
  return (
    <Avatar
      sx={{height: height, width: width}}
      alt={`${user.firstName} ${user.lastName}`}
      src={user.profilePicture ? user.profilePicture : noAvatar}>
    </Avatar>
  );
};

export default UserAvatar;