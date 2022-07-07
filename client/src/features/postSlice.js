import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, updatePost, deletePost, likePost } from './asyncThunk'


const postSlice = createSlice({
    name: 'posts',
    initialState: {
        postList: [],
        loading: false,
        fetchingError: null,
    },
    reducers: {},
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.postList = action.payload;
            state.fetchingError = null;
            state.loading = false;
        },
        [getPosts.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.postList.push(action.payload);
            state.fetchingError = null;
            state.loading = false;
        },
        [createPost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            const i = state.postList.findIndex((post) => post._id === action.payload._id);
            state.postList[i] = action.payload;
            state.fetchingError = null;
            state.loading = false;
        },
        [updatePost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
        [likePost.pending]: (state, action) => {
            state.loading = true;
        },
        [likePost.fulfilled]: (state, action) => {
            const i = state.postList.findIndex((post) => post._id === action.payload._id);
            state.postList[i] = action.payload;
            state.fetchingError = null;
            state.loading = false;
        },
        [likePost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.postList = action.payload;
            state.fetchingError = null;
            state.loading = false;
        },
        [deletePost.rejected]: (state, action) => {
            state.fetchingError = action.error;
        }, 
    }
})

export default postSlice.reducer;