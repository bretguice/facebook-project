import { createSlice } from "@reduxjs/toolkit";
import { getUserById, updateUser } from "./asyncThunk";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [{
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            profilePicture: ''
        }],
        fetchingUser: true,
        fetchingError: null
    },
    reducers: { },
    extraReducers: {
        [getUserById.pending]: (state, action) => {
            state.fetchingUser = true;
            state.fetchingError = null;
        },
        [getUserById.rejected]: (state, action) => {
            state.fetchingUser = false;
            state.fetchingError = action.error;
        },
        [getUserById.fulfilled]: (state, action) => {
            state.fetchingUser = false;
            state.users = action.payload;
        },
        [updateUser.pending]: (state, action) => {
            state.fetchingUser = true;
            state.fetchingError = null;
        },
        [updateUser.rejected]: (state, action) => {
            state.fetchingUser = false;
            state.fetchingError = action.error;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.fetchingUser = false;
            const user = state.users.find((u) => u.id === action.payload.id);
            if (!user) return;
            user.firstName = action.payload.firstName;
            user.lastName = action.payload.lastName;
            user.email = action.payload.email;
            user.profilePicture = action.payload.profilePicture;
        },
    }
})


export default userSlice.reducer;