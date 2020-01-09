import * as actionTypes from '../actions/actionTypes';

const initState = {
	error: null,
	loading: false,
	loggedUser: null,
	socketId: null,
};

const signInUserStart = (state, action) => {
	return {
		...state,
		error: null,
		loading: true
	};
};

const signInUserSuccess = (state, action) => {
	return {
		...state,
		loggedUser: action.user,
		error: null,
		loading: false
	};
};

const signInUserFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
	};
};

const signOutFinish = (state, action) => {
	return {
		...state,
		loggedUser: null,
		socketId: null
	}
}

const singUpUserStart = (state, action) => {
	return {
		...state,
		loading: true,
		error: null
	};
};

const singUpUserFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
	};
};

const setSocketId = (state, action) => {
	console.log('action.payload.socketId', action.payload.socketId)
	return {
		...state,
		socketId: action.payload.socketId
	}
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.SIGNIN_USER_START: return signInUserStart(state, action);
		case actionTypes.SIGNIN_USER_SUCCESS: return signInUserSuccess(state, action);
		case actionTypes.SIGNIN_USER_FAIL: return signInUserFail(state, action);
		case actionTypes.SIGNOUT_USER_FINISH: return signOutFinish(state, action);
		case actionTypes.SIGNUP_USER_START: return singUpUserStart(state, action);
		case actionTypes.SIGNUP_USER_FAIL: return singUpUserFail(state, action);
		case actionTypes.SOCKET_ID_SET: return setSocketId(state, action);

		default:
			return state;
	}
}

export default reducer;