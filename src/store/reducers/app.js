import * as actionTypes from '../actions/actionTypes';
import userStatuses from '../../utils/userStatuses';

const initState = {
	status: userStatuses.OFFLINE,
	showSignUp: false,
	showSettings: false,
	appLoading: true,
	lastActiveOn: Date.now()
};

const setAppLoading = (state, action) => {
	return {
		...state,
		appLoading: action.show
	};
};

const setShowSettings = (state, action) => {
	return {
		...state,
		showSettings: action.show
	};
};

const setActiveOnTime = (state, action) => {
	return {
		...state,
		lastActiveOn: Date.now()
	};
};

const setAppStatus = (state, action) => {
	return {
		...state,
		status: action.status
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.APP_SET_LOADING: return setAppLoading(state, action);
		case actionTypes.APP_SET_SHOW_SETTINGS: return setShowSettings(state, action);
		case actionTypes.APP_SET_ACTIVE_ON_TIME: return setActiveOnTime(state, action);
		case actionTypes.APP_SET_STATUS: return setAppStatus(state, action);
			
		default:
			return state;
	}
};

export default reducer;