import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'PostMessage'}],
    id: { type: String },
})

const User = mongoose.model('User', userSchema);

export default User;