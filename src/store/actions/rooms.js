import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';

export const fetchRooms = (loggedUserId) => {
	return async dispatch => {
		dispatch(fetchRoomsStart());
		try {
			const { data } = await axios("/rooms.json");
			// todo mb use getState. 
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
			// always return null even if resources did not exist
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

export const removeUserFromRoom = (userId, loggedUserId) => {

}

export const removeUserFromRoomStart = () => {

}

export const removeUserFromRoomSuccess = () => {

}

export const removeUserFromRoomFail = () => {

}