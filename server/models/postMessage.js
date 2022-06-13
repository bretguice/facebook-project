import mongoose, { Schema } from 'mongoose';

const postSchema = mongoose.Schema({
    message: String,
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User'},
    selectedImg: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'PostMessage'}],
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;