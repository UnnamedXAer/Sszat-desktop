import { SOCKET_INIT, SOCKET_DESTROY, SOCKET_SEND_MESSAGE_DO } from './socketActionTypes';


export const initSocket = (user) => {
	return {
		type: SOCKET_INIT,
		user,
		meta: {
			forSocket: true,
		}
	}
}

export const destroySocket = (user) => {
	return {
		type: SOCKET_DESTROY,
		meta: {
			forSocket: true,
		}
	}
}

export const sendMessageViaSocket = (message, roomId, tmpId) => {
	return {
		type: SOCKET_SEND_MESSAGE_DO,
		meta: {
			forSocket: true
		},
		message,
		roomId,
		tmpId
	}
};