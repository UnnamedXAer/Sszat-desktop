import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';

import appReducer from './store/reducers/app';
import authReducer from './store/reducers/auth';
import roomsReducer from './store/reducers/rooms';
import messagesReducer from './store/reducers/messages';
import usersReduce from './store/reducers/users';

document.documentElement.setAttribute('data-theme', 'dark'); // todo tmp to move to e.g. electron.js 

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	rooms: roomsReducer,
	messages: messagesReducer,
	users: usersReduce
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(reduxThunkMiddleware)
));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
