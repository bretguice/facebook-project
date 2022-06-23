import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./asyncThunk";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
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
        }
    }
})


export default userSlice.reducer;