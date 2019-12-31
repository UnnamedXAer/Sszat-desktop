import * as actionTypes from '../actions/actionTypes';
import userStatuses from '../../utils/userStatuses';

const initState = {
	users: [],
	loading: false,
	error: null,
	areUsersFetched: false
};

const fetchUsersStart = (state, action) => {
	return {
		...state,
		loading: true,
		error: null,
		areUsersFetched: true
	};
};

const fetchUsersSuccess = (state, action) => {
	const now = Date.now();
	const users = action.users.map(user => {
		let status = userStatuses.ACTIVE;
		if (user.isOnline) {
			const activeTime = user.lastActiveOn;
			if (now - 5 * 1000 * 60 > activeTime) {
				status = userStatuses.AFK;
			}
		}
		else {
			status = userStatuses.OFFLINE;
		}
		
		user.status = status;
		return user;
	});
	
	return {
		...state,
		users: users,
		loading: false,
		error: null,
		areUsersFetched: true
	};
};

const fetchUsersFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		areUsersFetched: true
	};
};

const userIsOnline = (state, action) => {
	const { user } = action.payload;
	const updatedUsers = [...state.users];
	const userIdx = updatedUsers.findIndex(x => x.id === user.id);
	user.lastActiveOn = Date.now();
	user.isOnline = true;
	user.status = userStatuses.ACTIVE;
	if (userIdx > -1) {
		updatedUsers[userIdx] = user;
	}
	else {
		updatedUsers.push(user);
	}
	return {
		...state,
		users: updatedUsers
	};
};

const userIsOffline = (state, action) => {
	const { userId } = action.payload;
	const updatedUsers = [...state.users];
	const userIdx = updatedUsers.findIndex(x => x.id === userId);

	const updatedUser = {
		...updatedUsers[userIdx],
		lastActiveOn: Date.now(),
		status: userStatuses.OFFLINE,
		isOnline: false
	};

	if (userIdx > -1) {
		updatedUsers[userIdx] = updatedUser
	}

	return {
		...state,
		users: updatedUsers
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.USERS_FETCH_START: return fetchUsersStart(state, action);
		case actionTypes.USERS_FETCH_SUCCESS: return fetchUsersSuccess(state, action);
		case actionTypes.USERS_FETCH_FAIL: return fetchUsersFail(state, action);
		case actionTypes.USER_ONLINE: return userIsOnline(state, action);
		case actionTypes.USER_OFFLINE: return userIsOffline(state, action);

		default:
			return state;
	}
}

export default reducer;