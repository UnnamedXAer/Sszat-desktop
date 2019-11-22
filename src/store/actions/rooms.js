import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { prepareStateForRoomSelect } from './messages';

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
		if (!room || !room.members) {
			return console.log("Room not found!", roomsState.activeRoom);
		}

		const activeRoomUsers = [];
		room.members.forEach(memberId => {
			const allUsers = getState().users.users;
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
			const { data } = await axios("/rooms.json");
			dispatch(fetchRoomsSuccess(data, loggedUserId));
		}
		catch (err) {
			dispatch(fetchRoomsFail(err));
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
			const { data } = await axios.post("/rooms.json", room);
			const newRoom = {...room, id: data.name};
			console.log('Ta Da! New Room is Created!', newRoom);
			dispatch(createRoomSuccess(newRoom));
			dispatch(prepareStateForRoomSelect(newRoom.id));
			dispatch(setActiveRoom(newRoom.id));
		}
		catch (err) {
			dispatch(createRoomFail(err));
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
			const res = await axios.delete(`/rooms/${id}.json`);
			// delete for firebase always return null even if resources did not exist
			dispatch(deleteRoomSuccess(id));
			console.log("deleted room: ", res);
		}
		catch (err) {
			dispatch(deleteRoomFail(err));
			console.log("error on room remove: ", err);
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

		try {
			const { data } = await axios.delete(`/rooms/${roomId}/members/${userId}.json`);
			console.log("remove user from room : ", roomId, userId, data);
			dispatch(removeUserFromRoomSuccess(roomId, userId));
			dispatch(setActiveRoomUsers());
		} 
		catch (err) {
			console.log('remove user from room err: ', err);
			dispatch(removeUserFromRoomFail());
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

export const leaveRoom = (roomId, loggerUserId) => {
	return async dispatch => {
		dispatch(leaveRoomStart());

		try {
			const { data } = await axios.delete(`/rooms/${roomId}/members/${loggerUserId}.json`);
			console.log('leave room success', data);
			dispatch(leaveRoomSuccess(roomId));
		}
		catch (err) {
			console.log('leave room err: ', err)
			dispatch(leaveRoomFail);
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