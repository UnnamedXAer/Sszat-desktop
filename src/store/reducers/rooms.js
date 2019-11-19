import * as actionTypes from '../actions/actionTypes';
import { fetchRoomsFail } from '../actions';

const initSate = {
	rooms: [],
	roomsLoading: true,
	roomsError: null,
	createRoomLoading: false,
	createRoomError: null,
	showCreateRoom: false
}

const fetchRoomsStart = (state, action) => {
	return {
		...state,
		roomsLoading: true,
		roomsError: null
	};
};

const fetchRoomsSuccess = (state, action) => {
	const incomingRooms = [];

	// eslint-disable-next-line no-unused-vars
	for (const key in action.rooms) {

		const newRoom = action.rooms[key];
		const members = mapObjectMembersToArrayMembers(newRoom.members);

		// logic for firebase use only
		if (members.includes(action.loggedUserId))
			incomingRooms.push({
				name: newRoom.name,
				createDate: newRoom.createDate,
				owner: newRoom.owner,
				members: members,
				id: key
			});
		else {
			// room does not includes logged user
			// do not display room if logged user does not belong to it.
		}
	}
	return {
		...state,
		roomsLoading: false,
		roomsError: null,
		rooms: incomingRooms
	}
}


const createRoomStart = (state, action) => {
	return {
		...state,
		createRoomLoading: true,
		createRoomError: null
	};
};

const createRoomSuccess = (state, action) => {

	const _room = { ...action.room, members: mapObjectMembersToArrayMembers(action.room.members) };

	return {
		...state,
		createRoomLoading: false,
		showCreateRoom: false,
		createRoomError: null,
		rooms: state.rooms.concat(_room)
	};
};

const createRoomFail = (state, action) => {
	return {
		...state,
		createRoomLoading: false,
		createRoomError: action.error
	};
};

const setCreateRoomLoading = (state, action) => {
	return {
		...state,
		createRoomLoading: action.isLoading
	};
};

const setShowCreateRoom = (state, action) => {
	return {
		...state,
		showCreateRoom: action.show
	};
};

const deleteRoomStart = (state, action) => {
	return {
		...state,
		roomsLoading: true,
		roomsError: null
	};
};

const deleteRoomSuccess = (state, action) => {
	const updatedRooms = state.rooms.filter(room => room.id !== action.roomId);
	return {
		...state,
		roomsLoading: false,
		roomsError: null,
		rooms: updatedRooms
	};
};

const deleteRoomFail = (state, action) => {
	return {
		...state,
		roomsLoading: false,
		roomsError: action.error
	};
};

const reducer = (state = initSate, action) => {
	switch (action.type) {
		case actionTypes.ROOMS_FETCH_START: return fetchRoomsStart(state, action);
		case actionTypes.ROOMS_FETCH_SUCCESS: return fetchRoomsSuccess(state, action);
		case actionTypes.ROOMS_FETCH_FAIL: return fetchRoomsFail(state, action);
		
		case actionTypes.ROOMS_CREATE_START: return createRoomStart(state, action);
		case actionTypes.ROOMS_CREATE_SUCCESS: return createRoomSuccess(state, action);
		case actionTypes.ROOMS_CREATE_FAIL: return createRoomFail(state, action);
		
		case actionTypes.ROOMS_CREATE_ROOM_SET_LOADING: return setCreateRoomLoading(state, action);
		case actionTypes.ROOMS_SET_SHOW_CREATE_ROOM: return setShowCreateRoom(state, action);
	
		case actionTypes.ROOMS_DELETE_START: return deleteRoomStart(state, action);
		case actionTypes.ROOMS_DELETE_SUCCESS: return deleteRoomSuccess(state, action);
		case actionTypes.ROOMS_DELETE_FAIL: return deleteRoomFail(state, action);

		default:
			return state;
	}
};

export default reducer;


// todo exclude to separate file

const mapObjectMembersToArrayMembers = members => {
	const arrMembers = [];
	if (members) {
		// eslint-disable-next-line
		for (const member in members) {
			if (members.hasOwnProperty(member)) {
				arrMembers.push(member);
			}
		}
	}
	return arrMembers;
}