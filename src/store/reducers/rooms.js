import * as actionTypes from '../actions/actionTypes';

const initSate = {
	rooms: [],
	publicRoom: {
		id: "public",
		owner: "sszat Company",
		name: "Public",
		createDate: new Date().toUTCString(),
		members: []
	},
	activeRoom: "public",
	activeRoomUsers: [],
	roomsLoading: true,
	roomsError: null,
	areRoomsFetched: false,
	createRoomLoading: false,
	createRoomError: null,
	showCreateRoom: false
}

const setPublicRoomMembers = (state, action) => {
	return {
		...state,
		publicRoom: {
			...state.publicRoom,
			members: [...action.members]
		}
	};
};

const setActiveRoomUsers = (state, action) => {
	return {
		...state,
		activeRoomUsers: [...action.users]
	};
};

const fetchRoomsStart = (state, action) => {
	return {
		...state,
		roomsLoading: true,
		roomsError: null,
		areRoomsFetched: true
	};
};

const fetchRoomsSuccess = (state, action) => {
	return {
		...state,
		roomsLoading: false,
		roomsError: null,
		rooms: [...action.rooms]
	};
};

const fetchRoomsFail = (state, action) => {
	return {
		...state,
		roomsLoading: false,
		roomsError: action.error,
		rooms: []
	}
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

const removeUserFromRoomStart = (state, action) => {
	return {
		...state,
		roomsLoading: true,
		roomsError: null
	};
};

const removeUserFromRoomSuccess = (state, action) => {

	const updatedRooms = [...state.rooms];
	const roomIndex = updatedRooms.findIndex(x => x.id === action.roomId);

	const updatedMembers = updatedRooms[roomIndex].members
		.filter(x => x !== action.userId);
	updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], members: updatedMembers };

	return {
		...state,
		roomsLoading: false,
		roomsError: null,
		rooms: updatedRooms
	};
};

const removeUserFromRoomFail = (state, action) => {
	return {
		...state,
		roomsLoading: false,
		roomsError: action.error
	};
};

const leaveRoomStart = (state, action) => {
	return {
		...state,
		roomsLoading: true,
		roomsError: null
	};
};

const leaveRoomSuccess = (state, action) => {

	const { roomId } = action;
	const activeRoom = state.activeRoom === roomId ? "public" : state.activeRoom;
	const updatedRooms = state.rooms.filter(room => room.id !== roomId);

	return {
		...state,
		roomsLoading: false,
		roomsError: null,
		activeRoom: activeRoom,
		rooms: updatedRooms
	};
};

const leaveRoomFail = (state, action) => {
	return {
		...state,
		roomsLoading: false,
		roomsError: action.error
	};
};

const setActiveRoom = (state, action) => {
	return {
		...state,
		activeRoom: checkIfRoomExistsAndGetId(state, action.roomId)
	};
};

/* Socket related */

const addRoom = (state, action) => {
	return {
		...state,
		rooms: state.rooms.concat(action.room)
	};
};

const createRoomStart = (state, action) => {
	return {
		...state,
		createRoomLoading: true,
		createRoomError: null
	};
};

const createRoomSuccess = (state, action) => {
	return {
		...state,
		createRoomLoading: false,
		showCreateRoom: false,
		createRoomError: null
	};
};

const createRoomFail = (state, action) => {
	return {
		...state,
		createRoomLoading: false,
		createRoomError: action.error
	};
};

const removeRoomFromList = (state, action) => {
	const updatedRooms = state.rooms.filter(room => room.id !== action.roomId);
	return {
		...state,
		activeRoom: state.activeRoom === action.roomId ? "public" : state.activeRoom,
		rooms: updatedRooms
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
	return {
		...state,
		roomsLoading: false,
		roomsError: null
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
		case actionTypes.ROOMS_SET_PUBLIC_ROOM_MEMBERS: return setPublicRoomMembers(state, action);
		case actionTypes.ROOMS_SET_ACTIVE_ROOM_USERS: return setActiveRoomUsers(state, action);

		case actionTypes.ROOMS_FETCH_START: return fetchRoomsStart(state, action);
		case actionTypes.ROOMS_FETCH_SUCCESS: return fetchRoomsSuccess(state, action);
		case actionTypes.ROOMS_FETCH_FAIL: return fetchRoomsFail(state, action);
		
		case actionTypes.ROOMS_ADD: return addRoom(state, action);
		case actionTypes.ROOMS_CREATE_START: return createRoomStart(state, action);
		case actionTypes.ROOMS_CREATE_SUCCESS: return createRoomSuccess(state, action);
		case actionTypes.ROOMS_CREATE_FAIL: return createRoomFail(state, action);
		
		case actionTypes.ROOMS_CREATE_ROOM_SET_LOADING: return setCreateRoomLoading(state, action);
		case actionTypes.ROOMS_SET_SHOW_CREATE_ROOM: return setShowCreateRoom(state, action);
	
		case actionTypes.ROOMS_REMOVE_FROM_LIST: return removeRoomFromList(state, action);
		case actionTypes.ROOMS_DELETE_START: return deleteRoomStart(state, action);
		case actionTypes.ROOMS_DELETE_SUCCESS: return deleteRoomSuccess(state, action);
		case actionTypes.ROOMS_DELETE_FAIL: return deleteRoomFail(state, action);

		case actionTypes.ROOMS_REMOVE_USER_FROM_ROOM_START: return removeUserFromRoomStart(state, action);
		case actionTypes.ROOMS_REMOVE_USER_FROM_ROOM_SUCCESS: return removeUserFromRoomSuccess(state, action);
		case actionTypes.ROOMS_REMOVE_USER_FROM_ROOM_FAIL: return removeUserFromRoomFail(state, action);

		case actionTypes.ROOMS_LEAVE_ROOM_START: return leaveRoomStart(state, action);
		case actionTypes.ROOMS_LEAVE_ROOM_SUCCESS: return leaveRoomSuccess(state, action);
		case actionTypes.ROOMS_LEAVE_ROOM_FAIL: return leaveRoomFail(state, action);

		case actionTypes.ROOMS_SET_ACTIVE_ROOM: return setActiveRoom(state, action);

		default:
			return state;
	}
};

export default reducer;


// todo exclude to separate file

const checkIfRoomExistsAndGetId = (state, roomId) => {
	let updatedActiveRoom = roomId

	if (updatedActiveRoom !== "public") {
		const prevActiveRoomIndex = state.rooms.findIndex(x => x.id === updatedActiveRoom);
		if (prevActiveRoomIndex === -1) {
			updatedActiveRoom = "public";
		}
	}

	return updatedActiveRoom;
}