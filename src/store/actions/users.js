import * as actionTypes from './actionTypes';
// import axios from '../../axios/axios';
import axiosLocal from '../../axios/axiosLocal';
import { setPublicRoomMembers } from './rooms';

export const fetchUsers = () => {
	return async dispatch => {
		dispatch(fetchUsersStart());

		try {
			const { data } = await axiosLocal.get("/users");
			dispatch(setPublicRoomMembers(data.map(x => x.id)));
			dispatch(fetchUsersSuccess(data));
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

