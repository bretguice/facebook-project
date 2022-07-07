import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Typography, Button, Card, CardHeader, CardMedia, Dialog,
    CardContent, CardActions, ImageList, ImageListItem, TextField, CircularProgress } from '@mui/material';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UserAvatar from '../../UserAvatar/UserAvatar';
import { getUserById, deletePost, updatePost, likePost} from '../../../features/asyncThunk';

const Post = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const postObj = { message: post.message, postId: post._id }
  const [edit, setEdit] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(postObj.message)
  const handleModalOpen = () => setEdit(true);
  const handleModalClose = () => setEdit(false);
  const dispatch = useDispatch();
  
  const authUser = useSelector((state) => state.auth.authData.result);
  const currentUser = useSelector((state) => state.users.userList.find((u) => u._id === authUser._id));

  const postCreator = useSelector((state)=> state.users.userList.find((u) =>{
    return u._id === post.creator
}), shallowEqual);

  useEffect(() =>{

    if(post.creator){
      dispatch(getUserById(post.creator)).unwrap();
      setLoading(false);
  }
  },[dispatch, post])

  const Likes = () => {
    if (post.likes) {
      return post.likes.find((like) => like === (currentUser._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} 
          others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
  }

  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};

  const handleChange = (e) => {
    setUpdatedMessage(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(updatePost({postId: post._id, updatedPost: updatedMessage }));
    handleModalClose();
  }

  const clickEditPost = () => {
    if(currentUser._id === post.creator) {
      handleModalOpen();
    } 
  }

  return (
    <div>
    {(loading) ? 
    <div>
      <CircularProgress />
    </div> :
    <>
     <Dialog 
      open={edit}
      maxWidth='lg'
      PaperProps={{sx:{width: '50vw'}}}
      style={{display:'flex', alignItems:'center', justifyContent:'center' }}
      >
        <Card
         >
          <form onSubmit={(e) => handleSubmit(e) }>
            <CardHeader 
              action={
              <Button style={{color: 'grey'}} size='small' onClick={handleModalClose}>
                <CloseIcon fontSize='medium'/>
              </Button>}
                title='Edit your post'
            />
            <TextField size='lg' name='message' 
              value={updatedMessage} onChange={(e) => handleChange(e)} 
              variant='outlined' multiline fullWidth rows={16}/>
            <Button type='submit' variant='contained' fullWidth> Submit</Button>
          </form>
        </Card>
      </Dialog>
    <Card sx={{margin:5}} >
       <CardHeader
      avatar={<Link to={`/user/${postCreator._id}`} style={{ textDecoration: 'none' }} >
        <UserAvatar height={'60px'} width={'60px'}  user={postCreator} ></UserAvatar>
      </Link>}
      action={
        <Button style={{color: 'grey'}} size='small' onClick={clickEditPost}>
          <MoreHorizIcon fontSize='medium'/>
        </Button>}
      title={<Link to={`/user/${post.creator}`} style={{ textDecoration: 'none' }} >
         {`${postCreator.firstName} ${postCreator.lastName}`}
         </Link>}
      subheader={moment(post.createdAt).fromNow()}
      />
    <CardContent>
      <Typography variant="body2" color="text.secondary">{post.message}</Typography>
    </CardContent>
  {(post.selectedImg.length > 0) ?     
     <ImageList sx={{ width: 400, height: 400 }} cols={1} rows={post.selectedImg.length} rowHeight={500}>
  {post.selectedImg.map((img) => (
    <ImageListItem key={img}>
      <CardMedia
      component="img"
      height="100%"
      width='100%'
      lodading='lazy'
      image={img}
  alt="Posted image"
      />
    </ImageListItem>
  ))} 
    </ImageList>
 : null }
    <CardActions >
        <Button size='small' color='primary' disabled={!currentUser} onClick={() => dispatch(likePost({postId: post._id, currentUser}))}>
          <Likes />
        </Button>
        {(currentUser?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
        </Button>
        )}
      </CardActions>
         {/*This is where the component to comment on posts will go */}
    </Card>
    </>
}
  </div>
  )
}

export default Post;