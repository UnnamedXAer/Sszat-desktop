import * as actionTypes from '../actions/actionTypes';

const initState = {
	showSignUp: false,
	showSettings: false,
	appLoading: true
};

const setAppLoading = (state, action) => {
	return {
		...state,
		appLoading: action.show
	}
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.APP_SET_LOADING: return setAppLoading(state, action);
			
		default:
			return state;
	}
};

export default reducer;