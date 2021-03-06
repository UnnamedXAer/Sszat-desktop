import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { prepareStateForRoomSelect } from './messages';
import { getErrorMessage } from '../../utils/requestError';
import { emitAction } from '../../socket/socket';
import messageTypes from '../../socket/messageTypes';

export const setPublicRoomMembers = (members) => {
	return {
		type: actionTypes.ROOMS_SET_PUBLIC_ROOM_MEMBERS,
		members
	};
};

export const setActiveRoomUsers = () => {

	return (dispatch, getState) => {

		let room;
		const roomsState = getState().rooms;
		if (roomsState.activeRoom === roomsState.publicRoom.id) {
			room = roomsState.publicRoom;
		}
		else {
			room = roomsState.rooms.find(x => x.id === roomsState.activeRoom);
		}

		const activeRoomUsers = [];
		const allUsers = getState().users.users;
		room.members.forEach(memberId => {
			const user = allUsers.find(x => x.id === memberId);
			if (user) {
				activeRoomUsers.push(user);
			}
		});
	
		dispatch({
			type: actionTypes.ROOMS_SET_ACTIVE_ROOM_USERS,
			users: activeRoomUsers
		});
	}
};

export const fetchRooms = (loggedUserId) => {
	return async dispatch => {
		dispatch(fetchRoomsStart());
		try {
			const { data } = await axios.get("/rooms");
			dispatch(fetchRoomsSuccess(data, loggedUserId));
		}
		catch (err) {
			const errMsg = getErrorMessage(err);
			dispatch(fetchRoomsFail(errMsg));
		}
	};
};

export const fetchRoomsStart = () => {
	return {
		type: actionTypes.ROOMS_FETCH_START
	};
};

export const fetchRoomsSuccess = (rooms, loggedUserId) => {
	return {
		type: actionTypes.ROOMS_FETCH_SUCCESS,
		rooms,
		loggedUserId
	};
};

export const fetchRoomsFail = (error) => {
	return {
		type: actionTypes.ROOMS_FETCH_FAIL,
		error
	};
};

export const setCreateRoomLoading = (isLoading) => {
	return {
		type: actionTypes.ROOMS_CREATE_ROOM_SET_LOADING,
		isLoading
	};
};

export const setShowCreateRoom = (show) => {
	return {
		type: actionTypes.ROOMS_SET_SHOW_CREATE_ROOM,
		show
	};
};

export const setActiveRoom = (roomId) => {
	return {
		type: actionTypes.ROOMS_SET_ACTIVE_ROOM,
		roomId
	}
} 

/* Socket related */

export const addRoom = (room) => {
	return {
		type: actionTypes.ROOMS_ADD,
		room
	};
};

export const createRoom = room => {
	return dispatch => {
		// send room via socket
		dispatch(createRoomStart(room));
	};
};

export const createRoomStart = emitAction((room) => {
	return {
		type: actionTypes.ROOMS_CREATE_START,
		key: messageTypes.ROOM_NEW,
		payload: {
			room
		}
	};
});

export const createRoomSuccess = (room) => {
	return dispatch => {
		dispatch(addRoom(room));
		dispatch(prepareStateForRoomSelect(room.id));
		dispatch({
			type: actionTypes.ROOMS_CREATE_SUCCESS
		});
		dispatch(setActiveRoom(room.id));

	};
};

export const createRoomFail = (error) => {
	return {
		type: actionTypes.ROOMS_CREATE_FAIL,
		error
	};
};
 
export const removeRoomFromList = (id) => {
	return {
		type: actionTypes.ROOMS_REMOVE_FROM_LIST,
		roomId: id
	}
}

export const deleteRoom = (id) => {
	return dispatch => {
		dispatch(deleteRoomStart(id));
	};
};

export const deleteRoomStart = emitAction((id) => {
	return {
		type: actionTypes.ROOMS_DELETE_START,
		key: messageTypes.ROOM_DELETE,
		payload: {
			id
		}
	};
});

export const deleteRoomSuccess = (id) => {
	return {
		type: actionTypes.ROOMS_DELETE_SUCCESS,
		roomId: id
	}
};

export const deleteRoomFail = (error) => {
	return {
		type: actionTypes.ROOMS_DELETE_FAIL,
		error
	};
};

export const leaveRoom = id => {
	return dispatch => dispatch(leaveRoomStart(id));
};

export const leaveRoomStart = emitAction((id) => {
	return {
		type: actionTypes.ROOMS_DELETE_START,
		key: messageTypes.ROOM_LEAVE,
		payload: {
			id
		}
	};
});

export const leaveRoomSuccess = (id) => {
	return dispatch => {
		dispatch(deleteRoomSuccess(id));
	};
};

export const leaveRoomFail = (error) => {
	return dispatch => {
		dispatch(deleteRoomFail(error));
	};
};

export const removeUserFromRoom = (roomId, userId) => {
	return (dispatch, getState) => {

		const activeRoom = getState().rooms.activeRoom;
		dispatch({
			type: actionTypes.ROOMS_REMOVE_USER_FROM_ROOM,
			roomId,
			userId
		});
		if (activeRoom === roomId) {
			dispatch(setActiveRoomUsers());
		}
	}
}

export const kickUserFromRoom = (roomId, userId) => {
	return dispatch => {
		dispatch(kickUserFromRoomStart(roomId, userId));
	};
};

export const kickUserFromRoomStart = emitAction((roomId, userId) => {
	return {
		type: actionTypes.ROOMS_DELETE_START,
		key: messageTypes.ROOM_KICK_USER,
		payload: {
			roomId, 
			userId
		}
	};
});

export const kickUserFromRoomSuccess = (roomId, userId) => {
	return dispatch => {
		dispatch(removeUserFromRoom(roomId, userId));
	};
};

export const kickUserFromRoomFail = (error) => {
	return dispatch => {
		dispatch(deleteRoomFail(error));
	};
};