import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';

export const prepareStateForRoomSelect = (roomId) => {
	return {
		type: actionTypes.MESSAGES_PREPARE_FOR_ROOM_SELECT,
		roomId
	};
};

export const fetchMessages = (roomId) => {
	return async dispatch => {
		dispatch(prepareStateForRoomSelect(roomId));
		dispatch(fetchMessagesStart(roomId));

		try {
			const { data } = await axios.get(`/messages/${roomId}.json`);
			const messages = data ? data : [];
			console.log(`fetch messages ${roomId} data`, messages);
			dispatch(fetchMessagesSuccess(roomId, messages));
		}
		catch (err) {
			console.log(`fetch messages ${roomId} err`, err);
			dispatch(fetchMessagesFail(roomId));
		}
	}
};

export const fetchMessagesStart = (roomId) => {
	return {
		type: actionTypes.MESSAGES_FETCH_START,
		roomId
	};
};

export const fetchMessagesSuccess = (roomId, messages) => {
	return {
		type: actionTypes.MESSAGES_FETCH_SUCCESS,
		roomId,
		messages
	};
};

export const fetchMessagesFail = (roomId) => {
	return {
		type: actionTypes.MESSAGES_FETCH_FAIL,
		roomId
	};
};