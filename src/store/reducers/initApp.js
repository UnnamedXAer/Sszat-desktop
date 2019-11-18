import * as actionTypes from '../actions/actionTypes';

const initState = {
	loggedUser: null,
	showSignUp: false,
	showSettings: false,
	appLoading: true,
	error: null
};

const fetchLoggedUserStart = (state, action) => {
	return {
		...state,
		loggedUser: null,
		appLoading: true
	};
};

const fetchLoggedUserSuccess = (state, action) => {
	return {
		...state,
		loggedUser: action.user,
		appLoading: false
	};
};

const fetchLoggedUserFail = (state, action) => {
	return {
		...state,
		loggedUser: null,
		appLoading: false,
		error: action.error
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_LOGGED_USER_START: return fetchLoggedUserStart(state, action);
		case actionTypes.FETCH_LOGGED_USER_SUCCESS: return fetchLoggedUserSuccess(state, action);
		case actionTypes.FETCH_LOGGED_USER_FAIL: return fetchLoggedUserFail(state, action);
			
		default:
			return state;
	}
};

export default reducer;