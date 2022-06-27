import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import userSlice from './features/userSlice';
import authSlice from './features/authSlice';
import postSlice from './features/postSlice'

const root = ReactDOMClient.createRoot(document.getElementById('root'));

const store = configureStore({
    reducer: {
        users: userSlice,
        posts: postSlice,
        auth: authSlice,
    }
});


root.render(
    <Provider store={store}>
        <App />
    </Provider>

);