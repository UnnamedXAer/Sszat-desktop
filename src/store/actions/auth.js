import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { setAppLoading } from './app';
import { getErrorMessage } from '../../utils/requestError';
import { init, emitAction } from '../../socket/socket';
import messageTypes from '../../socket/messageTypes';

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
			init(dispatch, process.env.REACT_APP_SOCKET_NAMESPACE);
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
	console.log(
		"+Signed In as: %c%s %c(%s)",
		`color: #9003fc; font-weight: bold`,
		user.userName,
		`font-weight: normal`,
		user.id
	)
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
	return async (dispatch) => {
		dispatch(fetchLoggedUserStart(userId));
		const url = `/users/${userId}`;
		try {
			const { data } = await axios.get(url);
			init(dispatch, process.env.REACT_APP_SOCKET_NAMESPACE);
			dispatch(signInUserSuccess(data));
		}
		catch (err) {
			const errMsg = getErrorMessage(err);
			// localStorage.removeItem("loggedUserId");
			dispatch(fetchLoggedUserFail(errMsg, userId))
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

export const signOutUser = () => {
	return async (dispatch, getState) => {

		try {
			await axios.get("/auth/logout");
		}
		catch (err) {
				// not relevant error, for now at least
				// user has to sign-in again anyway
		}
		localStorage.removeItem("loggedUserId");
		const { loggedUser } = getState().auth;
		if (loggedUser) {
			dispatch(loggedUserOffline(loggedUser.socketId, loggedUser.id));
		}
		dispatch(signOutUserFinish());
	}
}

export const loggedUserOffline = emitAction((socketId, userId) => {
	return {
		type: "DO_NOTHING",
		key: messageTypes.USER_OFFLINE,
		payload: {
			userId,
			socketId
		}
	}
});

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