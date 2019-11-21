import * as actionTypes from '../actions/actionTypes';

const initState = {
	users: [],
	loading: false,
	error: null,
	areUsersFetched: false
};

const fetchUsersStart = (state, action) => {
	return {
		...state,
		loading: true,
		error: null,
		areUsersFetched: true
	};
};

const fetchUsersSuccess = (state, action) => {
	return {
		...state,
		users: [...action.users],
		loading: false,
		error: null,
		areUsersFetched: true
	};
};

const fetchUsersFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		areUsersFetched: true
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.USERS_FETCH_START: return fetchUsersStart(state, action);
		case actionTypes.USERS_FETCH_SUCCESS: return fetchUsersSuccess(state, action);
		case actionTypes.USERS_FETCH_FAIL: return fetchUsersFail(state, action);
	
		default:
			return state;
	}
}

export default reducer;