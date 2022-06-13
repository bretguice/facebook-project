import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = (req, res) => {
    res.send('Sign in')
}

export const signup = (req, res) => {
    res.send('Sign up')
}