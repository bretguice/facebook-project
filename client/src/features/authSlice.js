import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "./asyncThunk";

    
const authSlice = createSlice({
    name: 'users',
    initialState: {
        authData: null,
        loading: false,
        message: null
    },
    reducers: {},
    extraReducers: {
        [signin.pending]: (state, action) => {
            state.loading = true;
            state.message = null;
        },
        [signin.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.error
        },
        [signin.fulfilled]: (state, action) => {
            state.authData = action.payload;
            state.loading = false;
            state.message = null;
        },
        [signup.pending]: (state, action) => {
            state.loading = true;
            state.message = null;
        },
        [signup.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.error;
        },
        [signup.fulfilled]: (state, action) => {
            state.authData = action.payload;
            state.loading = false;
            state.message = null;
        },
    }
})

export default authSlice.reducer;
