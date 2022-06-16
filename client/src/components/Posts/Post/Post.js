import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Typography, Button, Card, CardHeader, CardMedia, 
    CardContent, CardActions, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { deletePost, likePost } from '../../../actions/posts';

const SamplePost = ({ post, setCurrentId}) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

const Likes = () => {
  if (post.likes.length > 0) {
    return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
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
        <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
          R
        </Avatar>
      }
      action={
        <Button style={{color: 'grey'}} size='small' onClick={()=>setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='medium'/>
        </Button>
      }
      title={post.name}
      subheader={moment(post.createdAt).fromNow()}
    />
    <CardMedia
      component="img"
      height="20%"
      image={post.selectedImg || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
      alt="Posted image"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">{post.message}</Typography>
      <Typography variant='body2' color='textSecondary' >{post.tags.map((tag) => `#${tag} `)}</Typography>
    </CardContent>
    <CardActions disableSpacing>
      <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
        <Likes />
      </Button>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          Delete
      </Button>
      )}
    </CardActions>
   
  </Card>
  )
}

export default SamplePost