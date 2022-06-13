import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'PostMessage'}],
    id: { type: String },
})

const User = mongoose.model('User', userSchema);

export default User;