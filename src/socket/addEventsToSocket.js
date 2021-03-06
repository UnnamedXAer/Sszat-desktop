import * as actionTypes from '../store/actions/actionTypes';
import messageTypes from './messageTypes';
import logSocketMessage from './logger';
import * as actions from '../store/actions';
import { setUserIsActive } from '../store/actions';

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
	
	socket.on(messageTypes.USERS_ONLINE_ALL, (data) => {
		logSocketMessage(messageTypes.USERS_ONLINE_ALL, data, "on");
		const { users } = data;
		dispatch({
			type: actionTypes.USERS_SET_ACTIVE,
			payload: {
				users
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
        const { userId } = data;
        dispatch({
            type: actionTypes.USER_OFFLINE,
            payload: {
                userId
            }
        });
	});
	
	socket.on(messageTypes.USER_ACTIVE, (data) => {
		logSocketMessage(messageTypes.USER_ACTIVE, data, "on");
		const { userId } = data;
		dispatch(setUserIsActive(userId));
	});

	// TODO: use action creators
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
		dispatch(actions.messageReceived(message, roomId));
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
	
	socket.on(messageTypes.ROOM_DELETE_FINISH, data => {
		logSocketMessage(messageTypes.ROOM_DELETE_FINISH, data, "on");
		const { roomId } = data.payload;
		dispatch(actions.deleteRoomSuccess(roomId));
		dispatch(actions.removeRoomFromList(roomId));
	});

	socket.on(messageTypes.ROOM_DELETE_FAIL, data => {
		logSocketMessage(messageTypes.ROOM_DELETE_FAIL, data, "on");
		const { error, roomId } = data.payload;
		dispatch(actions.deleteRoomFail(error, roomId));
	});

	socket.on(messageTypes.ROOM_DELETE, data => {
		logSocketMessage(messageTypes.ROOM_DELETE, data, "on");
		const { roomId } = data.payload;
		dispatch(actions.removeRoomFromList(roomId));
	});

	socket.on(messageTypes.ROOM_LEAVE_FINISH, data => {
		logSocketMessage(messageTypes.ROOM_LEAVE_FINISH, data, "on");
		const { roomId } = data.payload;
		dispatch(actions.leaveRoomSuccess(roomId));
		dispatch(actions.removeRoomFromList(roomId));
	});

	socket.on(messageTypes.ROOM_LEAVE_FAIL, data => {
		logSocketMessage(messageTypes.ROOM_LEAVE_FAIL, data, "on");
		const { error, roomId } = data.payload;
		dispatch(actions.leaveRoomFail(error, roomId));
	});

	socket.on(messageTypes.ROOM_LEAVE, data => {
		logSocketMessage(messageTypes.ROOM_LEAVE, data, "on");
		const { roomId, userId } = data.payload;
		dispatch(actions.removeUserFromRoom(roomId, userId));
	});

	socket.on(messageTypes.ROOM_KICK_USER_FINISH, data => {
		logSocketMessage(messageTypes.ROOM_KICK_USER_FINISH, data, "on");
		const { roomId, userId } = data.payload;
		dispatch(actions.removeUserFromRoom(roomId, userId));
	});

	socket.on(messageTypes.ROOM_KICK_USER_FAIL, data => {
		logSocketMessage(messageTypes.ROOM_KICK_USER_FAIL, data, "on");
		const { error, roomId } = data.payload;
		dispatch(actions.kickUserFromRoomFail(error, roomId));
	});

	socket.on(messageTypes.ROOM_KICK_USER, data => {
		logSocketMessage(messageTypes.ROOM_LEAVE, data, "on");
		const { roomId, userId } = data.payload;
		dispatch(actions.removeUserFromRoom(roomId, userId));
	});
};

export default addEventsListenersToSocket;