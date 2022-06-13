import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = (req, res) => {
    res.send('Get Posts')
}

export const createPost = (req, res) => {
    res.send('Create Post')
}

export const updatePost = (req, res) => {
    res.send('Update Post')
}

export const deletePost = (req, res) => {
    res.send('Delete Post')
}

export const likePost = (req, res) => {
    res.send('Like Post')
}