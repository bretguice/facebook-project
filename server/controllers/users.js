import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from "../models/user.js";

export const getUsers =  async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser =  async (req,res) => {
    const userId = req.params.id;
    try{
        const users = await User.findById(userId);
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');
    const updatedUser = await User.findByIdAndUpdate(id, { ...user, user, id}, { new: true });
    res.status(201).json(updatedUser);
}

export const friendRequest = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.body;

    try{
        const user = await User.findById(id);

        if(user._id === _id){
            return res.status(400).json({message: "You cannot add yourself as a friend"});
        }

        if(user.friends.includes(_id)){
            return res.status(400).json({ message: 'You are already friends'})
        }

        if(user.friendRequest.includes(_id)){
            return res.status(400).json({ message: 'You have already sent this user a friend request'})
        }

        const updatedFriendReq = [...user.friendRequest, _id];
        user.friendRequest = updatedFriendReq;
        const updatedUser = await user.save()
        return res.status(201).json({ message: 'friend request submitted', user });
        
    } catch (err){
        res.status(500).json({ err: err.message })
    }    
}

export const acceptFriend = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.body;

    try{
        const user = await User.findById(id);
        const friendUser = await User.findById(_id);

        const updatedFriendReq = user.friendRequest.filter((user) => user._id != _id);
        user.friendRequest = updatedFriendReq;
        const updatedFriendList = [...user.friends, _id];
        user.friends = updatedFriendList;
        const updatedUser = await user.save();

        const friendUpdFriendReq = user.friendRequest.filter((user) => user._id != id);
        friendUser.friendRequest = friendUpdFriendReq;
        const friendUpdFriendList = [...friendUser.friends, id];
        friendUser.friends = friendUpdFriendList;
        const updatedFriendUser = await friendUser.save();

        const populatedUser = await User.findById(updatedUser._id).populate('friends');

        res.status(201).json({ message: 'Friend request accepted', user: populatedUser, friendUser: updatedFriendUser })
        

    } catch(err){
        res.status(500).json({ err: err.message })
    }

}

export const declineFriend = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.body;

    try{
        const user = await User.findById(id);

        const updatedFriendReq = user.friendRequest.filter((user) => user._id != _id);
        user.friendRequest = updatedFriendReq;
        const friendList = user.friend.filter((user) => user._id != id);
        user.friend = friendList;
        const updatedUser = await user.save();

        res.status(201).json({ message: 'Friend request declined', user: updatedUser})

    }catch (err) {
        res.status(500).json({ err: err.message })
    }
}