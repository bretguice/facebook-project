import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userSlice from './userSlice';
import authSlice from './authSlice';
import postSlice from './postSlice';

    const persistConfig = {
        key: 'root',
        version: 1,
        storage,

    };      

    const rootReducer = combineReducers({
        users: userSlice,
        posts: postSlice,
        auth: authSlice,
    });
  
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
        }),
    });

export default store;