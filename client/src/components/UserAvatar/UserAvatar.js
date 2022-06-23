import React, { useState, useEffect } from 'react';
import {Avatar} from '@mui/material';
import noAvatar from '../../img/noAvatar.png';

const UserAvatar = ({ user }) => {
  const [initials, setInitials] = useState("");
  
  // useEffect(() => {
  //   console.log('use effect UserAvatar' + user.firstName)
  //   if (user) {
  //     console.log("run set initials")
  //     setInitials(`${user.firstName[0]}${user.lastName[0]}`);
  //     console.log(user)
  //     console.log(initials)
  //   }
  // }, [user]); 

  return (
    <Avatar
      alt={`${user.firstName} ${user.lastName}`}
      src={user.profilePicture ? user.profilePicture : noAvatar}>
      {/* {user.profilePicture ? null : initials} */}
    </Avatar>
  );
};

export default UserAvatar;