import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequest: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'PostMessage'}],
})

const User = mongoose.model('User', userSchema);

export default User;