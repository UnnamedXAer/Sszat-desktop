import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';

import appReducer from './reducers/app';
import authReducer from './reducers/auth';
import roomsReducer from './reducers/rooms';
import messagesReducer from './reducers/messages';
import usersReduce from './reducers/users';
import settingsReducer from './reducers/settings';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	rooms: roomsReducer,
	messages: messagesReducer,
	users: usersReduce,
	settings: settingsReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(reduxThunkMiddleware)
));

export default store;