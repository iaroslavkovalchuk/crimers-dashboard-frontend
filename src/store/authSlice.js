import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthorized : false,
        user : {},
        isLoading: false,
    },
    reducers: {
        setAuthorized(state, action){
            console.log("action: ", action.payload.user)
            state.isAuthorized = true;
            state.user = action.payload.user;
        },
        unAuthorized(state){
            state.isAuthorized = false;
        },
        loadingOn: (state) => {
            state.isLoading = true;
        },
        loadingOff: (state) => {
            state.isLoading = false;
        }
    }
})

export default authSlice.reducer;
export const { loadingOn, loadingOff, setAuthorized, unAuthorized } = authSlice.actions;