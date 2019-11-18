import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';

import initAppReducer from './store/reducers/initApp';
import signInReducer from './store/reducers/signIn';
import signUpReducer from './store/reducers/signUp';

document.documentElement.setAttribute('data-theme', 'dark'); // todo tmp to move to e.g. electron.js 

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
	initApp: initAppReducer,
	signIn: signInReducer,
	signUp: signUpReducer
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
