import * as actionTypes from '../actions/actionTypes';
import userStatuses, { updateUserStatus } from '../../utils/userStatuses';

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
	// const now = Date.now();
	// const updatedUsers = action.users.map(user =>  {
	// 	user.lastActiveOn = new Date(user.lastActiveOn).getTime();
	// 	return updateUserStatus(now, user);
	// });
	
	const updatedUsers = action.users.map(user => ({ ...user, status: userStatuses.OFFLINE}));

	return {
		...state,
		users: updatedUsers,
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

const updateUsersStatuses = (state, action) => {
	const { users } = state;
	const now = Date.now();
	const updatedUsers = users.map(user => updateUserStatus(now, user));

	return {
		...state,
		users: updatedUsers
	};
};

const setActiveUsers = (state, action) => {

	const updatedUsers = [...state.users];
	const activeUsers = action.payload.users;
	const now = Date.now();
	activeUsers.forEach(user => {
		const currentUserIdx = updatedUsers.findIndex(x => x.id === user.id);
		if (currentUserIdx > -1) {
			let updatedUser = { ...updatedUsers[currentUserIdx] };
			updatedUser.isOnline = true;
			updatedUser.lastActiveOn = new Date(user.lastActiveOn).getTime();
			updatedUser = updateUserStatus(now, updatedUser)
			updatedUsers[currentUserIdx] = updatedUser;
		}
	});

	return {
		...state,
		users: updatedUsers
	};
};

const setUserIsActive = (state, action) => {
	const { userId } = action;
	const updatedUsers = [...state.users];
	const now = Date.now();
	const currentUserIdx = updatedUsers.findIndex(x => x.id === userId);
	if (currentUserIdx > -1) {
		let updatedUser = { ...updatedUsers[currentUserIdx] };
		updatedUser.isOnline = true;
		updatedUser.lastActiveOn = now;
		updatedUser = updateUserStatus(now, updatedUser)
		updatedUsers[currentUserIdx] = updatedUser;
	}
	return {
		...state,
		users: updatedUsers
	};
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.USERS_FETCH_START: return fetchUsersStart(state, action);
		case actionTypes.USERS_FETCH_SUCCESS: return fetchUsersSuccess(state, action);
		case actionTypes.USERS_FETCH_FAIL: return fetchUsersFail(state, action);
		case actionTypes.USER_ONLINE: return userIsOnline(state, action);
		case actionTypes.USER_OFFLINE: return userIsOffline(state, action);
		case actionTypes.USERS_UPDATE_STATUSES: return updateUsersStatuses(state, action);
		case actionTypes.USERS_SET_ACTIVE: return setActiveUsers(state, action);
		case actionTypes.USER_ACTIVE: return setUserIsActive(state, action);

		default:
			return state;
	}
}

export default reducer;