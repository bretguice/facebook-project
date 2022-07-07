import { createSlice } from "@reduxjs/toolkit";
import { getUserById, updateUser, getUsers, friendRequest, acceptFriend, declineFriend } from "./asyncThunk";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        userList: [{
            firstName: '',
            lastName: '',
            email: '',
            profilePicture: '',
            friends: ['62c4904d760ecc101b91957b'],
            friendRequest: [],
        }],
        loading: true,
        fetchingError: null
    },
    reducers: { },
    extraReducers: {
        [getUserById.pending]: (state, action) => {
            state.loading = true;
            state.fetchingError = null;
        },
        [getUserById.rejected]: (state, action) => {
            state.loading = false;
            state.fetchingError = action.error;
        },
        [getUserById.fulfilled]: (state, action) => {
            state.loading = false;
            state.selectedUser = action.payload;
            const i = state.userList.findIndex((user) => user._id === action.payload._id);
            state.userList[i] = action.payload;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
            state.fetchingError = null;
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.fetchingError = action.error;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.fetchingError = null;
            const i = state.userList.findIndex((user) => user._id === action.payload._id);
            state.userList[i] = action.payload;
        },
        [getUsers.fulfilled] : (state, action) => {
            state.loading = false;
            state.userList = action.payload;
        },
        [getUsers.pending]: (state, action) => {
            state.loading = true;
            state.fetchingError = null;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
            state.fetchingError = action.error;
        },
        [friendRequest.pending]: (state, action) => {
            state.loading = true;
            state.fetchingError = null;
        },
        [friendRequest.rejected]: (state, action) => {
            state.loading = false;
            state.fetchingError = action.error;
        },
        [friendRequest.fulfilled]: (state, action) => {
            state.loading = false;
            state.fetchingError = null;
            const i = state.userList.findIndex((user) => user._id === action.payload._id);
            state.userList[i] = action.payload;
        },
        [acceptFriend.pending]: (state, action) => {
            state.loading = true;
            state.fetchingError = null;
        },
        [acceptFriend.rejected]: (state, action) => {
            state.loading = false;
            state.fetchingError = action.error;
        },
        [acceptFriend.fulfilled]: (state, action) => {
            state.loading = false;
            state.fetchingError = null;
            const i = state.userList.findIndex((user) => user._id === action.payload._id);
            state.userList[i] = action.payload;
        },
        [declineFriend.pending]: (state, action) => {
            state.loading = true;
            state.fetchingError = null;
        },
        [declineFriend.rejected]: (state, action) => {
            state.loading = false;
            state.fetchingError = action.error;
        },
        [declineFriend.fulfilled]: (state, action) => {
            state.loading = false;
            state.fetchingError = null;
            const i = state.userList.findIndex((user) => user._id === action.payload._id);
            state.userList[i] = action.payload;
        },
    }
})


export default userSlice.reducer;