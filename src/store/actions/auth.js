import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { setAppLoading } from './app';

export const signInUser = (credentials) => {
	return dispatch => {

		dispatch(signInUserStart());
		const email = credentials["Email Address"];
		const url = `/users.json?orderBy="email"&equalTo="${email}"`;
		axios.get(url)
			.then(res => {
				const userIds = Object.keys(res.data);
				console.log('Logged successfully? ', userIds.length > 0, res);
				if (userIds.length === 0) {
					dispatch(signInUserFail("Email Address or Password is incorrect."));
				}
				else {
					const loggedUserId = userIds[0];
					localStorage.setItem("loggedUserId", loggedUserId);
					const user = { ...res.data[loggedUserId], id: loggedUserId };
					dispatch(signInUserSuccess(user, loggedUserId));
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

export const fetchLoggedUser = (userId) => {
	return dispatch => {
		dispatch(fetchLoggedUserStart(userId));

		const url = `/users/${userId}.json`;
		axios.get(url)
			.then(res => {
				const user = (res.data ? res.data : null);
				if (user) {
					user.id = userId;
					dispatch(signInUserSuccess(user, userId));
				}
				else {
					localStorage.removeItem("loggedUserId");
				}
			})
			.catch(err => {
				dispatch(fetchLoggedUserFail(err, userId))
			})
			.finally(() => {
				dispatch(setAppLoading(false));
			});;
	};
};

export const fetchLoggedUserStart = (userId) => {
	return {
		type: actionTypes.FETCH_LOGGED_USER_START,
		userId
	};
};

export const fetchLoggedUserFail = (error, userId) => {
	return {
		type: actionTypes.FETCH_LOGGED_USER_FAIL,
		error
	};
};

export const signOutUser = (loggedUser) => {
	return async dispatch => {

		try {
			const res = await axios.post("/signOutLog.json", { ...loggedUser });
			console.log('signOut results: ', res);
		}
		catch (err) {
			console.log('signOut error: ', err);
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

/* Region Sign Up */

export const signUpUser = (payload) => {
	return async dispatch => {
		dispatch(signUpUserStart());
		try {
			let createdUserId;
			const isEmailUnique = await checkIsEmailUnique(payload.email);
			if (isEmailUnique) {
				createdUserId = await postUser(payload);
				if (createdUserId) {
					const user = await getUser(createdUserId);
					if (user) {
						user.id = createdUserId;
						localStorage.setItem("loggedUserId", createdUserId);
						dispatch(signInUserSuccess(user, createdUserId));
					}
				}
			}
			else {
				dispatch(signUpUserFail("Email address already in use."));
			}
		}
		catch (err) {
			console.log('err', err)
			dispatch(signUpUserFail("Ops, something went wrong. Try again later."));
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

/* TODO - new file ************************************************** */
const checkIsEmailUnique = async (emailAddress) => {
	try {
		const { data } = await axios.get(`/users.json?orderBy="email"&equalTo="${emailAddress}"`);
		const userCount = Object.keys(data).length;
		return userCount === 0;
	}
	catch (err) {
		throw err;
	}
};

const postUser = async (payload) => {
	try {
		const { data } = await axios.post("/users.json", { ...payload });
		return data.name ? data.name : null;
	}
	catch (err) {
		throw err;
	}
};

const getUser = async (id) => {
	try {
		const { data } = await axios.get(`/users/${id}.json`);
		return data;
	}
	catch (err) {
		throw err;
	}
};
/*************************************************** */

/* END Region SignUp */