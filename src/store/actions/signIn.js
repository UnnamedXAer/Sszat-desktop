import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { fetchLoggedUserSuccess } from './initApp';

export const signInUser = (credentials) => {
	return dispatch => {

		dispatch(signInUserStart());
		const email = credentials["Email Address"];
		const url = `/1users.json?orderBy="email"&equalTo="${email}"`;
		axios.get(url)
			.then(res => {
				const userIds = Object.keys(res.data);
				console.log('Logged successfully? ', userIds.length > 0, res);
				if (userIds.length === 0) {
					dispatch(signInUserFail("Email Address or Password is incorrect."));
				}
				else {
					const user = { ...res.data[userIds[0]], id: userIds[0] };
					dispatch(fetchLoggedUserSuccess(user, userIds[0]));
				}
			})
			.catch(err => {
				console.log('err', err);
				dispatch(signInUserFail("Ops, something went wrong. Try again later."));
			});
	};
};

export const signInUserStart = () => {
	return {
		type: actionTypes.SIGNIN_USER_START
	};
};

export const signInUserSuccess = (user) => {
	return {
		type: actionTypes.SIGNIN_USER_SUCCESS,
		user
	};
};

export const signInUserFail = (error) => {
	return {
		type: actionTypes.SIGNIN_USER_FAIL,
		error
	};
};