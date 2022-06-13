import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

const root = ReactDOMClient.createRoot(document.getElementById('root'));

const store = createStore(reducers, compose(applyMiddleware(thunk)));

root.render(
    <Provider store={store}>
        <App />
    </Provider>

);