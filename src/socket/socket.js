import io from 'socket.io-client';
import * as actionTypes from '../store/actions/actionTypes';
import messageTypes from './messageTypes';
import { getErrorMessage } from '../utils/requestError';
// import { sendMessageSuccess } from '../store/actions/messages';

let socket;

const init = (dispatch, rootURL) => {
    socket = io(rootURL);
    

    socket.once("connected", (data) => {
        logSocketMessage("connected", data, "once");

        dispatch({
            type: actionTypes.SOCKET_ID_SET,
            payload: {
                socketId: socket.id
            }
        });
    });
	
	socket.on(messageTypes.USER_ONLINE, (data) => {
        logSocketMessage(messageTypes.USER_ONLINE, data, "on");
        const { user } = data;
        dispatch({
            type: actionTypes.USER_ONLINE,
            payload: {
                user
            }
        });
    });

    socket.on(messageTypes.USER_OFFLINE, (data) => {
        logSocketMessage(messageTypes.USER_OFFLINE, data, "on");
        const { user } = data;
        dispatch({
            type: actionTypes.USER_OFFLINE,
            payload: {
                user
            }
        });
    });

	socket.on(messageTypes.MESSAGE_NEW_FINISH, data => {
		logSocketMessage(messageTypes.MESSAGE_NEW_FINISH, data, "on");
		const { message, roomId, tmpId } = data.payload;
		dispatch({
			type: actionTypes.MESSAGES_SEND_SUCCESS,
			payload: {
				message,
				roomId,
				tmpId
			}
		});
    });
    
    socket.on(messageTypes.MESSAGE_NEW_FAIL, data => {
		logSocketMessage(messageTypes.MESSAGE_NEW_FAIL, data, "on");
		const { error, roomId, tmpId } = data.payload;
		dispatch({
			type: actionTypes.MESSAGES_SEND_FAIL,
			payload: {
				error,
				roomId,
				tmpId
			}
		});
	});

	socket.on(messageTypes.MESSAGE_NEW, data => {
		logSocketMessage(messageTypes.MESSAGE_NEW, data, "on");
		const { message, roomId } = data.payload;
		dispatch({
			type: actionTypes.MESSAGES_RECEIVED,
			message,
			roomId
		});
	});
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
			// throw new Error("I'm throwing this.");
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

const logSocketMessage = (key, data, type) => {
	const color = type === "emit" ? "green" : "blue";
	console.log(`---[socket.client]: %c${type} %c${key}%c data: %o`,
		`color: #e08300; font-weight: normal`,
		`color: ${color}; font-weight: bold`,
		"color: initial; font-weight: normal",
		data
	);
};

export { init, emit, emitAction };