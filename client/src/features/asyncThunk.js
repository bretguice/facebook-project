import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import {  useNavigate } from 'react-router-dom';

export const getUserById = createAsyncThunk('user/getUserById', async (userId) => {
    const response = await api.get(`/user/${userId}`);
    return response.data;     
})

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    console.log('fetch all users')
    const response = await api.get(`/user`);
    return response.data;     
})


export const getPosts = createAsyncThunk('posts/getposts', async () => {
    const response = await api.get('/posts');
    return response.data;
})

export const createPost = createAsyncThunk( 'posts/createPost', async (newPost) => {
    const response = await api.post('/posts', newPost);
    return response.data;
})

export const updatePost = createAsyncThunk('posts/updatePost', async (params) => {
    const { id, updatedPost} = params;
    const response = await api.patch(`/posts/${id}`, updatedPost);
    return response.data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
})

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
    const response = await api.patch(`/posts/${id}/likePost`);
    return response.data;
})

export const signin = createAsyncThunk('auth/signin', async (formData) => {
    const response = await api.post('/auth/signin', formData);
    useNavigate('/');
    return response.data;
})

export const signup = createAsyncThunk('auth/signup', async (formData) => {
    const response = await api.post('/auth/signup', formData);
    useNavigate('/');
    return response.data;
})

