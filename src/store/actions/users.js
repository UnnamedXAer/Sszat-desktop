import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { setPublicRoomMembers } from './rooms';

export const fetchUsers = () => {
	return async dispatch => {
		dispatch(fetchUsersStart());

		try {
			const { data } = await axios.get("/users.json");
			const users = [];
			const usersId = [];
			if (typeof data == "object") {
				// eslint-disable-next-line no-unused-vars
				for (const key in data) {
					users.push({
						...data[key],
						id: key
					});
					usersId.push(key);
				}
				dispatch(setPublicRoomMembers(usersId));
			}
			dispatch(fetchUsersSuccess(users));
		} 
		catch (err) {
			console.log('fetch users err: ', err);
			dispatch(fetchUsersFail(err));
		}
	};
};

export const fetchUsersStart = () => {
	return {
		type: actionTypes.USERS_FETCH_START
	};
};

export const fetchUsersSuccess = (users) => {
	return {
		type: actionTypes.USERS_FETCH_SUCCESS,
		users
	};
};

export const fetchUsersFail = () => {
	return {
		type: actionTypes.USERS_FETCH_FAIL
	};
};

