import * as actionTypes from './actionTypes';
const { ipcRenderer } = window.require("electron");

export const setAppLoading = (show) => {
	return {
		type: actionTypes.APP_SET_LOADING,
		show: show
	};
};

export const setShowSettings = (show) => {
	return {
		type: actionTypes.APP_SET_SHOW_SETTINGS,
		show
	};
};

export const setActiveOnTime = () => {
	return {
		type: actionTypes.APP_SET_ACTIVE_ON_TIME
	};
};

export const setAppStatus = (status) => {
	return dispatch => {
		ipcRenderer.send("status-changed", {
			status
		});

		dispatch({
			type: actionTypes.APP_SET_STATUS,
			status
		});
	}
}