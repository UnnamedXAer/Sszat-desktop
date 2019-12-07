import * as actionTypes from '../store/actions/actionTypes';
import messageTypes from './messageTypes';
import logSocketMessage from './logger';
import * as actions from '../store/actions';

const addEventsListenersToSocket = (socket, dispatch) => {

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

    socket.on(messageTypes.ROOM_NEW_FINISH, data => {
		logSocketMessage(messageTypes.ROOM_NEW_FINISH, data, "on");
        const { room } = data.payload;
        dispatch(actions.createRoomSuccess(room));
    });

    socket.on(messageTypes.ROOM_NEW_FAIL, data => {
		logSocketMessage(messageTypes.ROOM_NEW_FAIL, data, "on");
		const { error } = data.payload;
		dispatch(actions.createRoomFail(error));
	});
    
    socket.on(messageTypes.ROOM_NEW, data => {
		logSocketMessage(messageTypes.ROOM_NEW, data, "on");
		const { room } = data.payload;
		dispatch(actions.addRoom(room));
    });
};

export default addEventsListenersToSocket;