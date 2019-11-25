import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { prepareStateForRoomSelect } from './messages';
import { getErrorMessage } from '../../utils/requestError';

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

export const createRoom = (room) => {
	return async dispatch => {
		dispatch(createRoomStart());
		try {
			const { data } = await axios.post("/rooms", room);
			dispatch(createRoomSuccess(data));
			dispatch(prepareStateForRoomSelect(data.id));
			dispatch(setActiveRoom(data.id));
		}
		catch (err) {
			const errMsg = getErrorMessage(err);
			dispatch(createRoomFail(errMsg));
		}
	};
};

export const createRoomStart = () => {
	return {
		type: actionTypes.ROOMS_CREATE_START
	};
};

export const createRoomSuccess = (room) => {
	return {
		type: actionTypes.ROOMS_CREATE_SUCCESS,
		room
	};
};

export const createRoomFail = (error) => {
	return {
		type: actionTypes.ROOMS_CREATE_FAIL,
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

export const deleteRoom = (id) => {
	return async dispatch => {
		dispatch(deleteRoomStart());

		try {
			await axios.delete(`/rooms/${id}`);
			dispatch(deleteRoomSuccess(id));
		}
		catch (err) {
			const errMsg = getErrorMessage(err);
			dispatch(deleteRoomFail(errMsg));
		}
	}
}

export const deleteRoomStart = () => {
	return {
		type: actionTypes.ROOMS_DELETE_START
	};
};

export const deleteRoomSuccess = (roomId) => {
	return {
		type: actionTypes.ROOMS_DELETE_SUCCESS,
		roomId
	};
};

export const deleteRoomFail = (error) => {
	return {
		type: actionTypes.ROOMS_DELETE_FAIL,
		error
	};
};

export const removeUserFromRoom = (roomId, userId) => {
	return async dispatch => {
		dispatch(removeUserFromRoomStart());
		const url = `/rooms/${roomId}/members/${userId}`;
		try {
			await axios.delete(url);
			dispatch(removeUserFromRoomSuccess(roomId, userId));
			dispatch(setActiveRoomUsers());
		} 
		catch (err) {
			const errMsg = getErrorMessage(err);
			dispatch(removeUserFromRoomFail(errMsg));
		}
	};
};

export const removeUserFromRoomStart = () => {
	return {
		type: actionTypes.ROOMS_REMOVE_USER_FROM_ROOM_START
	};
};

export const removeUserFromRoomSuccess = (roomId, userId) => {
	return {
		type: actionTypes.ROOMS_REMOVE_USER_FROM_ROOM_SUCCESS,
		roomId,
		userId
	};
};

export const removeUserFromRoomFail = (error) => {
	return {
		type: actionTypes.ROOMS_REMOVE_USER_FROM_ROOM_FAIL,
		error
	};
};

// TODO - mb remove and use removeUserFromRoom
export const leaveRoom = (roomId, loggerUserId) => {
	return async dispatch => {
		dispatch(leaveRoomStart());

		const url = `/rooms/${roomId}/members/${loggerUserId}`;
		try {
			await axios.delete(url);
			dispatch(leaveRoomSuccess(roomId));
		}
		catch (err) {
			const errMsg = getErrorMessage(err);
			dispatch(leaveRoomFail(errMsg));
		}
	};
};

export const leaveRoomStart = () => {
	return {
		type: actionTypes.ROOMS_LEAVE_ROOM_START
	};
};

export const leaveRoomSuccess = (roomId) => {
	return {
		type: actionTypes.ROOMS_LEAVE_ROOM_SUCCESS,
		roomId
	};
};

export const leaveRoomFail = (error) => {
	return {
		type: actionTypes.ROOMS_LEAVE_ROOM_FAIL,
		error
	};
};

export const setActiveRoom = (roomId) => {
	return {
		type: actionTypes.ROOMS_SET_ACTIVE_ROOM,
		roomId
	}
} 