import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from "../models/user.js";

export const getUsers =  async (req,res) => {
    console.log('get users')
    try{
        const users = await User.find();
        console.log('users' + users)
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
    const { id: _id } = req.params;
    const user = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id}, { new: true });

}