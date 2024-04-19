import { configureStore } from "@reduxjs/toolkit"
import authReducer from './authSlice'
import notificationSlice from "./notificationSlice";

const appStore = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationSlice
    }
})

export default appStore;