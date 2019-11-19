import * as actionTypes from './actionTypes';
// import axios from '../../axios/axios';

export const setAppLoading = (show) => {
	return {
		type: actionTypes.APP_SET_LOADING,
		show: show
	}
}