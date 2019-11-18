import * as actionTypes from '../actions/actionTypes';

const initState = {
	error: null,
	loading: false,
	// tryCount: 0
};

const signInUserStart = (state, action) => {
	return {
		...state,
		error: null,
		loading: true
		// tryCount: (state.tryCount + 1)
	};
};

// const signInUserSuccess = (state, action) => {
// 	return {
// 		...state,
// 		error: null,
// 		loading: false
// 	};
// };

const signInUserFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.SIGNIN_USER_START: return signInUserStart(state, action);
		// case actionTypes.SIGNIN_USER_SUCCESS: return signInUserSuccess(state, action);
		case actionTypes.SIGNIN_USER_FAIL: return signInUserFail(state, action);
			
		default:
			return state;
	}
}

export default reducer;