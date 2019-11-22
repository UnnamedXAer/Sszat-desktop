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

const setShowSettings = (state, action) => {
	return {
		...state,
		showSettings: action.show
	}
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.APP_SET_LOADING: return setAppLoading(state, action);
		case actionTypes.APP_SET_SHOW_SETTINGS: return setShowSettings(state, action);
			
		default:
			return state;
	}
};

export default reducer;