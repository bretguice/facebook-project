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
        }, 
        [createPost.pending]: (state, action) => {
            state.fetchingPosts = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload);
            state.fetchingError = null;
            state.fetchingPosts = false;
        },
        [createPost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
        [updatePost.pending]: (state, action) => {
            state.fetchingPosts = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.fetchingError = null;
            state.fetchingPosts = false;
        },
        [updatePost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
        [likePost.pending]: (state, action) => {
            state.fetchingPosts = true;
        },
        [likePost.fulfilled]: (state, action) => {
            state.posts.filter((post) => post._id === action.payload._id).likes.push(action.payload);
            state.fetchingError = null;
            state.fetchingPosts = false;
        },
        [likePost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
        [deletePost.pending]: (state, action) => {
            state.fetchingPosts = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.fetchingError = null;
            state.fetchingPosts = false;
        },
        [deletePost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
    }
})

export default postSlice.reducer;