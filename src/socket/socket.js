import io from 'socket.io-client';
import { getErrorMessage } from '../utils/requestError';
import logSocketMessage from './logger';
import addEventsListenersToSocket from './addEventsToSocket';

let socket;

const init = (dispatch, rootURL) => {
    socket = io(rootURL);
    addEventsListenersToSocket(socket, dispatch);
};

const emit = (type, payload) => socket && socket.emit(type, payload);

const emitAction = action => {
    return (...args) => {
        const result = action.apply(this, args);
        if (socket) {
			const payload = { 
				...result.payload, 
				type: result.type 
			};
			logSocketMessage(result.key, payload, "emit");
            try {
				socket.emit(result.key, payload);
				// update will be triggered by socket listener handler
				return {
					type: "DO_NOTHING",
					payload: {}
				};
			}
			catch (err) {
				const errMsg = getErrorMessage(err);
				return {
					...result.payload,
					type: result.typeFail,
					error: errMsg
				}
			}
		}
		else {
			return result;
		}
    };
};

const disconnect = () => {
	if (!socket.disconnected) {
		socket.disconnect();
	}
}

export { init, emit, emitAction, disconnect };
