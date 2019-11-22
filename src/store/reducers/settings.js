import * as actionTypes from '../actions/actionTypes';

const initState = {
	applicationTheme: "dark",
	messageFontSize: "100",
	playMessageNotificationSound: true,
	messageNotificationSoundLevel: "100",
	showMessageNotifications: true,
	showMessageTextInNotifications: true
};

const setSettings = (state, action) => {
	return {
		...state,
		...action.settings
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.SETTINGS_SET: return setSettings(state, action);
	
		default:
			return state;
	}
};

export default reducer;