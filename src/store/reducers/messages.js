import * as actionTypes from '../actions/actionTypes';

const initState = {
	messages: { "public": [] },
	areMessagesLoadedForRoom: { "public": true },
	loading: false,
	error: null
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

		// eslint-disable-next-line no-unused-vars
		for (const messageId in loadedMessages) {
			const downloadedMessage = { ...loadedMessages[messageId].msg };
			const message = {
				id: messageId,
				authorId: downloadedMessage.authorId || "UNNAMED-AUTHOR",
				parts: downloadedMessage.parts || [],
				time: downloadedMessage.time || new Date().toUTCString(),
				files: downloadedMessage.files || []
			}
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

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.MESSAGES_PREPARE_FOR_ROOM_SELECT: return prepareStateForRoomSelect(state, action);

		case actionTypes.MESSAGES_FETCH_START: return fetchMessagesStart(state, action);
		case actionTypes.MESSAGES_FETCH_SUCCESS: return fetchMessagesSuccess(state, action);
		case actionTypes.MESSAGES_FETCH_FAIL: return fetchMessagesFail(state, action);
			
		default:
			return state;
	}
};

export default reducer;