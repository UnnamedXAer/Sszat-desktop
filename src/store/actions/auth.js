import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { setAppLoading } from './app';

export const signInUser = (credentials) => {
	return async dispatch => {

		dispatch(signInUserStart());
		const emailAddress = credentials["Email Address"];
		const password = credentials["Password"];
		try {
			const { data } = await axios.post("/auth/login", {
				emailAddress,
				password
			});
			const user = data;
			localStorage.setItem("loggedUserId", user.id);
			dispatch(signInUserSuccess(user));
		}
		catch (err) {
			let errorMessage = getErrorMessage(err);
			dispatch(signInUserFail(errorMessage));
		}
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

export const fetchLoggedUser = (userId) => {
	return async dispatch => {
		dispatch(fetchLoggedUserStart(userId));
		const url = `/users/${userId}`;
		try {
			const { data } = await axios.get(url);
			dispatch(signInUserSuccess(data));
		}
		catch (err) {
			dispatch(fetchLoggedUserFail(err.message, userId))
		}
		dispatch(setAppLoading(false));
	};
};

export const fetchLoggedUserStart = (userId) => {
	return {
		type: actionTypes.FETCH_LOGGED_USER_START,
		userId
	};
};

export const fetchLoggedUserFail = (error) => {
	return {
		type: actionTypes.FETCH_LOGGED_USER_FAIL,
		error
	};
};

export const signOutUser = (loggedUser) => {
	return async dispatch => {

		try {
			const res = await axios.get("/auth/logout");
		}
		catch (err) {
				// not relevant error, for now at least
				// user has to sign-in again anyway
		}
		localStorage.removeItem("loggedUserId");
		dispatch(signOutUserFinish());
	}
}

export const signOutUserFinish = () => {
	return {
		type: actionTypes.SIGNOUT_USER_FINISH
	};
};

export const signUpUser = (payload) => {
	return async dispatch => {
		dispatch(signUpUserStart());
		try {
			const createdUser = await postUser(payload);
			if (createdUser) {
				localStorage.setItem("loggedUserId", createdUser);
				dispatch(signInUserSuccess(createdUser));
			}
			else {
				dispatch(signUpUserFail("Ops, something went wrong. Try again later."));
			}
		}
		catch (err) {
			let errorMessage = getErrorMessage(err);
			dispatch(signUpUserFail(errorMessage));
		}
	};
};

export const signUpUserStart = () => {
	return {
		type: actionTypes.SIGNUP_USER_START
	};
};

export const signUpUserFail = (error) => {
	return {
		type: actionTypes.SIGNUP_USER_FAIL,
		error
	};
};

const postUser = async (payload) => {
	try {
		const { data } = await axios.post("/auth/register", payload);
		return data ? data : null;
	}
	catch (err) {
		throw err;
	}
};

const getErrorMessage = (err)  => {
	return (err.response && err.response.status === 406 && err.response.data.message) 
	? err.response.data.message 
	: "Ops, something went wrong. Try again later.";
};