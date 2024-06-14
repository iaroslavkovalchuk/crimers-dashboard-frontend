import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from './authSlice';
import notificationSlice from "./notificationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // You can choose which parts of the state to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(appStore);
export default appStore;