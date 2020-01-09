import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { setPublicRoomMembers } from './rooms';
import { emitAction } from '../../socket/socket';
import messageTypes from '../../socket/messageTypes';

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

export const updateUsersStatuses = () => {
	return {
		type: actionTypes.USERS_UPDATE_STATUSES
	};
};

export const setActiveUsers = (users) => {
	return {
		type: actionTypes.USERS_SET_ACTIVE,
		users
	};
};

export const notifyUserIsActive = () => {
	return dispatch => {
		const payload = {};
		dispatch(emitAction(() => ({
			type: actionTypes.USER_ACTIVE,
			key: messageTypes.USER_ACTIVE,
			payload
		})));
	}
};

export const setUserIsActive = (userId) => {
	return {
		type: actionTypes.USER_ACTIVE,
		userId
	};
};