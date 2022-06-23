import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Typography, Button, Card, CardHeader, CardMedia, 
    CardContent, CardActions } from '@mui/material';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UserAvatar from '../../UserAvatar/UserAvatar';
import { getUserById, deletePost, likePost } from '../../../features/asyncThunk';

const Post = ({ post,  setCurrentId}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users);
  const currentUser = JSON.parse(localStorage.getItem('profile'));

  useEffect(() =>{
    dispatch(getUserById(post.creator));

  },[dispatch])

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (currentUser?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
  }

  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};

  return (
    <Card sx={{margin:5}} >
    <CardHeader
      avatar={
         <UserAvatar sx={{ width: 30, height:30 }}  user={user} ></UserAvatar>
      }
      action={
        <Button style={{color: 'grey'}} size='small' onClick={()=>setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='medium'/>
        </Button>
      }
      title={`${user.firstName}  ${user.lastName}`}
      subheader={moment(post.createdAt).fromNow()}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">{post.message}</Typography>
    </CardContent>
    {(post.selectedImg) ? 
    <CardMedia
      component="img"
      height="10%"
      image={post.selectedImg || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
      alt="Posted image"
    /> : null }
    <CardActions >
      <Button size='small' color='primary' disabled={!currentUser?.result} onClick={() => dispatch(likePost(post._id))}>
        <Likes />
      </Button>
      {(currentUser?.result?._id === post?.creator) && (
      <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          Delete
      </Button>
      )}
    </CardActions>
   
  </Card>
  )
}

export default Post;