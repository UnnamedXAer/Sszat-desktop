import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';

export const fetchLoggedUser = (userId) => {
	return dispatch => {
		dispatch(fetchLoggedUserStart(userId));

		const url = `/users/${userId}.json`;
		axios.get(url)
			.then(res => {
				const user = (res.data ? res.data : null);
				if (user) {
					user.id = userId;
					dispatch(fetchLoggedUserSuccess(user, userId));
				}
				else {
					localStorage.removeItem("loggedUserId");
				}
			})
			.catch(err => {
				dispatch(fetchLoggedUserFail(err, userId))
			});
	};
};

export const fetchLoggedUserStart = (userId) => {
	return {
		type: actionTypes.FETCH_LOGGED_USER_START,
		userId
	};
};

export const fetchLoggedUserSuccess = (user, userId) => {
	return {
		type: actionTypes.FETCH_LOGGED_USER_SUCCESS,
		user
	};
};

export const fetchLoggedUserFail = (error, userId) => {
	return {
		type: actionTypes.FETCH_LOGGED_USER_FAIL,
		error
	};
};

export const setAppLoading = (show) => {
	return {
		type: actionTypes.APP_SET_LOADING,
		show: show
	}
}