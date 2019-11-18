import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { fetchLoggedUserSuccess } from './initApp';

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
						dispatch(fetchLoggedUserSuccess(user));
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



export const signUpUserStart = () => {
	return {
		type: actionTypes.SIGNUP_USER_START
	};
};

// export const signUpUserSuccess = () => {
// 	return {
// 		type: actionTypes.SIGNUP_USER_SUCCESS,
// 	};
// };

export const signUpUserFail = (error) => {
	return {
		type: actionTypes.SIGNUP_USER_FAIL,
		error
	};
};