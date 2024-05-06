import { createSlice } from "@reduxjs/toolkit";
import { sign } from "jsonwebtoken";

const intialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (sate) => {
            sate.loading=true;
            state.error=null;
        },

        signInSuccess: (state, action) => {
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },

        signInFailure: (state,action) => {
            state.loading= false;
            sate.error= action.payload;
        },
    },
});
export const { signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;