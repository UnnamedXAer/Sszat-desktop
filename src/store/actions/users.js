import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { setPublicRoomMembers } from './rooms';

export const fetchUsers = () => {
	return async dispatch => {
		dispatch(fetchUsersStart());

		try {
			const { data } = await axios.get("/users");
			dispatch(setPublicRoomMembers(data.map(x => x.id)));
			dispatch(fetchUsersSuccess(data));
		} 
		catch (err) {
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
