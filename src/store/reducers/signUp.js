import * as actionTypes from '../actions/actionTypes';

const initState = {
	loading: false,
	error: null
}

const singUpStart = (state, action) => {
	return {
		...state,
		loading: true,
		error: null
	};
};

const singUpFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.SIGNIN_USER_START: return singUpStart(state, action);
		case actionTypes.SIGNIN_USER_FAIL: return singUpFail(state, action);
	
		default:
			return state;
	}
}

export default reducer;