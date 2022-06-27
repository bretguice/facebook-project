import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Typography, Button, Card, CardHeader, CardMedia, Modal,
    CardContent, CardActions, ImageList, ImageListItem, TextField } from '@mui/material';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UserAvatar from '../../UserAvatar/UserAvatar';
import { getUserById, deletePost, updatePost, likePost } from '../../../features/asyncThunk';

const Post = ({ post }) => {
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() =>{
    dispatch(getUserById(post.creator));

  },[dispatch])

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (currentUser?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} 
          others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
  }

  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};

const ModalScreen = () => {
  if(edit){
  setEdit(false);
  } else {
    setEdit(true);
  }
}

  const EditPost = () => {
    // if(currentUser.id === post.creator)
    if (edit) {
      return( 
      <Modal open={edit}>
        <form onSubmit={() => dispatch(updatePost())}>
          <Typography variant='h4'>Edit Post</Typography>
          <TextField size='large' variant='body2'>{post.message}</TextField>
          <Button type='submit' > Submit</Button>
        </form>
      </Modal>)
    } 
  }

  return (
    <Card sx={{margin:5}} >
    <CardHeader
      avatar={
         <UserAvatar sx={{ width: 30, height:30 }}  user={user} ></UserAvatar>
      }
      action={
        <Button style={{color: 'grey'}} size='small' onClick={()=>EditPost}>
          <MoreHorizIcon fontSize='medium'/>
        </Button>
      }
      title={`${user.firstName}  ${user.lastName}`}
      subheader={moment(post.createdAt).fromNow()}
    />
    <EditPost />
    <CardContent>
      <Typography variant="body2" color="text.secondary">{post.message}</Typography>
    </CardContent>
    {(post.selectedImg) ? 
    <CardMedia
      component="img"
      height="10%"
      image={post.selectedImg || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
      alt="Posted image"
    /> : null}
    {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
  {post.selectedImg.map((img) => (
    <ImageListItem key={img}>
      <img
        src={`${img}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={'uploaded'}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList> */}
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