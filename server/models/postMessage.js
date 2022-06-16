import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const postSchema = new Schema({
    message: String,
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User'},
    selectedImg: String,
    tags: [String],
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