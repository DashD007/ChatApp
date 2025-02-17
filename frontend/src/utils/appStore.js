import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js"
import socketReducer from "./socketSlice.js"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user:userReducer,
    message:messageReducer,
    socket:socketReducer
})
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
const persistedReducer = persistReducer(persistConfig, rootReducer)

const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export default appStore;