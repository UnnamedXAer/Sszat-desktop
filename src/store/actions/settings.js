import * as actionTypes from './actionTypes';
import { setShowSettings } from './app';

export const updateSettings = (settings) => {
	return async (dispatch, getStore)  => {
		const { loggedUser } = getStore().auth;
		localStorage.setItem(`settings-${loggedUser.id}`, JSON.stringify(settings));
		dispatch(setShowSettings(false));
		dispatch(setSettings(settings));
	}
};

export const setSettings = (settings) => {
	return {
		type: actionTypes.SETTINGS_SET,
		settings
	};
};