import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const getUserById = createAsyncThunk('user/getUserById', async (userId) => {
    const response = await api.get(`/user/${userId}`);
    return response.data;     
})

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    const response = await api.get(`/user`);
    return response.data;     
})

export const updateUser = createAsyncThunk('user/updateUser', async (userInfo) => {
    const { userData, profileId } = userInfo;
    const response = await api.patch(`/user/${profileId}`, userData);
    return response.data;
})

export const friendRequest = createAsyncThunk('user/friendRequest', async (friendReqObj) => {
    const { currentUser, id } = friendReqObj;
    const response = await api.patch(`/user/friendRequest/${id}`, currentUser);
    return response.data;
})

export const acceptFriend = createAsyncThunk('user/acceptFriend', async (friendReqObj) => {
    const { currentUser, friend } = friendReqObj;
    const response = await api.put(`/user/friend/${currentUser._id}`, friend);
    return response.data;
})

export const declineFriend = createAsyncThunk('user/declineFriend', async (friendReqObj) => {
    const { currentUser, friend } = friendReqObj;
    const response = await api.put(`/user/friend/${currentUser._id}`, friend);
    return response.data;
})

export const getPosts = createAsyncThunk('posts/getposts', async () => {
    const response = await api.get('/posts');
    return response.data;
})

export const createPost = createAsyncThunk( 'posts/createPost', async (newPost, thunkAPI) => {
    
    try{
        const response = await api.post('/posts/createPost', newPost);
        return response.data;
    } catch (err){
        console.log(err.message)
    }
})

export const createComment = createAsyncThunk( 'posts/createComment', async (newPost, thunkAPI) => {
    
    try{
        const response = await api.post('/posts/createComment', newPost);
        return response.data;
    } catch (err){
        console.log(err.message)
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (updateObj) => {
    try{
        const { postId } = updateObj;
        const response = await api.patch(`/posts/${postId}`, updateObj);
        return response.data;
    } catch (err){
        console.log(err.message)
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
})

export const likePost = createAsyncThunk('posts/likePost', async (updateObj) => {
    const { postId, currentUser } = updateObj;
    const response = await api.patch(`/posts/${postId}/likePost`, currentUser);
    return response.data;
})

export const signin = createAsyncThunk('auth/signin', async (formData, thunkAPI) => {
    const response = await api.post('/auth/signin', formData);
    if (response.status === 200 ){
    localStorage.setItem('user', JSON.stringify(response.data));
    } else {
    return thunkAPI.rejectWithValue(response)
    }
    return response.data;
})

export const signup = createAsyncThunk('/auth/signup', async (formData, thunkAPI) => {
    const response = await api.post('/auth/signup', formData);
    if (response.status === 201 ){
        localStorage.setItem('user', JSON.stringify(response.data));
        } else {
        return thunkAPI.rejectWithValue(response)
        }
        return response.data;
})

export const testDrive = createAsyncThunk('/auth/test', async (email, thunkAPI) => {
    const response = await api.post('/auth/test', email );
    if (response.status === 200 ){
    localStorage.setItem('user', JSON.stringify(response.data));
    } else {
    return thunkAPI.rejectWithValue(response)
    }
    return response.data;
})

