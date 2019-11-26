import * as actionTypes from '../actions/actionTypes';

const initState = {
	messages: { "public": [] },
	areMessagesLoadedForRoom: { "public": true },
	loading: false,
	error: null,
	isSending: []
};

const prepareStateForRoomSelect = (state, action) => {
	const { roomId } = action;
	if (!state.areMessagesLoadedForRoom.hasOwnProperty(roomId)) {
		const updatedAreMessagesLoadedForRoom = { ...state.areMessagesLoadedForRoom, [roomId]: false };
		const updatedMessages = { ...state.messages, [roomId]: [] };
		return {
			...state,
			areMessagesLoadedForRoom: updatedAreMessagesLoadedForRoom,
			messages: updatedMessages
		};
	}
	else {
		return {
			...state
		};
	}
};

const fetchMessagesStart = (state, action) => {
	return {
		...state,
		loading: true,
		error: null
	};
};

const fetchMessagesSuccess = (state, action) => {
	const { roomId } = action;
	if (!state.areMessagesLoadedForRoom[roomId]) {

		const loadedMessages = action.messages;
		const formattedLoadedMessages = [];

//todo changes for... in... 

		// eslint-disable-next-line no-unused-vars
		for (const messageId in loadedMessages) {
			const downloadedMessage = { ...loadedMessages[messageId] };

			let files = [];
			if (downloadedMessage.files) {
				downloadedMessage.files.forEach(file => {
					const updatedFile = {
						...file,
						data: file.data.type === "Buffer" ? Buffer.from(file.data.data) : file
					}
					files.push(updatedFile);
				});
			}

			const message = {
				id: downloadedMessage.id,
				authorId: downloadedMessage.createBy || "UNNAMED-AUTHOR",
				parts: downloadedMessage.parts || [],
				time: downloadedMessage.createDate || new Date().toUTCString(),
				predefinedMsgKey: downloadedMessage.predefinedMsgKey,
				files: files //downloadedMessage.files || []
			};
			formattedLoadedMessages.push(message);
		}

		const updatedAreMessagesLoadedForRoom = { ...state.areMessagesLoadedForRoom, [roomId]: true };
		const roomMessages = [...state.messages[roomId]].concat(formattedLoadedMessages);
		// todo sort by time
		const updatedMessages = { ...state.messages, [roomId]: roomMessages };
		
		return {
			...state,
			loading: false,
			error: null, 
			areMessagesLoadedForRoom: updatedAreMessagesLoadedForRoom,
			messages: updatedMessages
		};
	}
	else {
		return {
			...state,
			loading: false,
			error: true
		}
	}
};

const fetchMessagesFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error
		// probably nothing to do more
	};
};

const sendMessageStart = (state, action) => {

	const updatedMessages = { ...state.messages };
	updatedMessages[action.payload.roomId] = updatedMessages[action.payload.roomId].concat({ ...action.payload.message });

	return {
		...state,
		messages: updatedMessages,
		isSending: state.isSending.concat(action.payload.message.id)
	};
};

const sendMessageSuccess = (state, action) => {

	const { message, tmpId, roomId } = action;

	const updatedMessages = { ...state.messages };

	const updatedRoomMsgs = [...updatedMessages[roomId]];
	const updatedMsgIndex = updatedRoomMsgs.findIndex(x => x.id === tmpId);
	updatedRoomMsgs[updatedMsgIndex] = { ...message };
	updatedMessages[roomId] = updatedRoomMsgs;

	return {
		...state,
		messages: updatedMessages,
		isSending: state.isSending.filter(x => x !== tmpId)
	};
};

const sendMessageFail = (state, action) => {
	return {
		...state,
		isSending: state.isSending.filter(x => x !== action.tmpId)
	};
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.MESSAGES_PREPARE_FOR_ROOM_SELECT: return prepareStateForRoomSelect(state, action);

		case actionTypes.MESSAGES_FETCH_START: return fetchMessagesStart(state, action);
		case actionTypes.MESSAGES_FETCH_SUCCESS: return fetchMessagesSuccess(state, action);
		case actionTypes.MESSAGES_FETCH_FAIL: return fetchMessagesFail(state, action);

		case actionTypes.MESSAGES_SEND_START: return sendMessageStart(state, action);
		case actionTypes.MESSAGES_SEND_SUCCESS: return sendMessageSuccess(state, action);
		case actionTypes.MESSAGES_SEND_FAIL: return sendMessageFail(state, action);
			
		default:
			return state;
	}
};

export default reducer;