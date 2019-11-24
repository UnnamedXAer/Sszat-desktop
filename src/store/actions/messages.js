import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import uuid from 'uuid/v1';

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

		const url = `/rooms/${roomId}/messages/`;
		try {
			const { data } = await axios.get(url);
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

export const sendMessage = (message, roomId) => {
	return async dispatch => {
		const tmpId = ("tmpId" + uuid()) + uuid();
		message.id = tmpId;
		dispatch(sendMessageStart(message, roomId, tmpId));

		const url = `/rooms/${roomId}/messages`;
		const payload = {
			createdBy: message.authorId,
			filesCount: message.files.length,
			parts: message.parts
		};
		try {
			const { data } = await axios.post(url, payload);
			// send files / predeined messages.
			message.id = data.id;
			dispatch(sendMessageSuccess(message, roomId, tmpId));
		}
		catch (err) {
			console.log('send message err: ', err);
			dispatch(sendMessageFail(roomId, tmpId));
		}
	}
}

export const sendMessageStart = (message, roomId, tmpId) => {
	return {
		type: actionTypes.MESSAGES_SEND_START,
		message, 
		roomId, 
		tmpId
	};
};

export const sendMessageSuccess = (message, roomId, tmpId) => {
	return {
		type: actionTypes.MESSAGES_SEND_SUCCESS,
		message,
		roomId,
		tmpId
	};
};

export const sendMessageFail = (roomId, tmpId) => {
	return {
		type: actionTypes.MESSAGES_SEND_FAIL,
		tmpId,
		roomId
	};
};