import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";
import { body } from 'express-validator'

export const getPosts =  async (req,res) => {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) =>{
    body('message').trim().escape();
    body('creator').trim().escape();
    body('selectedImg').trim().escape();
    body('createdAt').toDate().trim().escape();
    const { message, creator, selectedImg, createdAt } = req.body;
    const creatorUser = await User.findById(creator);
    const newPostMessage = new PostMessage({ message, selectedImg, createdAt, creator,  name: `${creatorUser.firstName} ${creatorUser.lastName}`,  })    
    try{
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createComment = async (req, res) =>{
    body('message').trim().escape();
    body('creator').trim().escape();
    body('selectedImg').trim().escape();
    body('createdAt').toDate().trim().escape();
    const { message, creator, selectedImg, createdAt } = req.body;
    const creatorUser = await User.findById(creator);
    const newPostMessage = new PostMessage({ message, selectedImg, createdAt, creator,  name: `${creatorUser.firstName} ${creatorUser.lastName}`,  })    
    try{
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) =>{

    const { id } = req.params;

    body('updatedPost').trim().escape();
    const post = req.body;
    const {updatedPost} = post;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const updatePost = await PostMessage.findByIdAndUpdate(id, { ...post, message: updatedPost }, { new: true });
    res.json(updatePost);
}

export const deletePost = async (req, res) =>{
    const { id: _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.json({ message: 'Unauthenticated' })
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((user) => user === String(req.userId));
    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((user) => user !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}