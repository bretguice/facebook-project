import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, updatePost, deletePost, likePost } from './asyncThunk'


const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        fetchingPosts: false,
        fetchingError: null,
    },
    reducers: {},
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.fetchingPosts = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.fetchingError = null;
            state.fetchingPosts = false;
        },
        [getPosts.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }
    }
})

export default postSlice.reducer;