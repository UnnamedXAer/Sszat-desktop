import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import uuid from 'uuid/v1';
import { emitAction } from '../../socket/socket';
import messageTypes from '../../socket/messageTypes';
import notify from '../../utils/notifications';

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
			dispatch(fetchMessagesSuccess(roomId, messages));
		}
		catch (err) {
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

export const addMessage = (message, roomId) => {
	return {
		type: actionTypes.MESSAGES_ADD,
		payload: {
			message,
			roomId
		}
	}
};

export  const sendMessage = (message, roomId) => {
	return dispatch => {
		const tmpId = ("tmpId" + uuid()) + uuid();
		message.id = tmpId;

		// Add message instantly to UI
		dispatch(addMessage(message, roomId));
		// send message via socket

		dispatch(sendMessageStart(message, roomId, tmpId));
	};
};

export const sendMessageStart = emitAction((message, roomId, tmpId) => {

	const payload = {
		message: {
			createdBy: message.authorId,
			filesCount: message.files.length,
			parts: message.parts,
			files: message.files,
			predefinedMsgKey: message.predefinedMsgKey
		},
		roomId,
		tmpId
	};

	return {
		type: actionTypes.MESSAGES_RECEIVED,
		key: messageTypes.MESSAGE_NEW,
		payload
	}
});

export const sendMessageFail = (roomId, tmpId) => {
	return {
		type: actionTypes.MESSAGES_SEND_FAIL,
		tmpId,
		roomId
	};
};

export const messageReceived = (message, roomId) => {
	return (dispatch, getState) => {
		const { rooms } = getState().rooms;
		const room = rooms.find(room => room.id = roomId);
		const roomName = room ? room.name : "";
		notify(`${roomName} - New message`);
		dispatch({
			type: actionTypes.MESSAGES_RECEIVED,
			message,
			roomId
		});
	}
}