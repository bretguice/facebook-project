import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const postSchema = new Schema({
    message: {type: String },
    name: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User'},
    selectedImg: [String],
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