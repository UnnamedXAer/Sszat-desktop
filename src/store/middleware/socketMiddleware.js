import ioClient from 'socket.io-client';
import * as socketActionTypes from '../actions/socketActionTypes';
import { 
	// sendMessageSuccess, 
	newMessage 
} from '../actions/messages';
// import * as socketActions from '../actions/socketActions';

const createSocketMiddleware = (extraArg) => {
	let socket;
	return store => next => action => {
		
		if (action.meta && action.meta.forSocket) {
			switch (action.type) {
				case socketActionTypes.SOCKET_INIT: {
					socket = createNewSocket();

					socket.on("connected", data => {
						console.log("----SOCKET---- on connected ", data);
					});

					socket.on("new-message", data => {
						console.log("----SOCKET---- on new-message ", data);
						// store.dispatch(sendMessageSuccess(data, data.roomId));
					});
					
					socket.on("new-message-completed", data => {
						console.log("----SOCKET---- on new-message-completed ", data);
						store.dispatch(newMessage(data.message, data.roomId, data.tmpId));
					});

					break;
				}
				case socketActionTypes.SOCKET_DESTROY: {
					console.log("----SOCKET---- disconnect");
					socket.disconnect();
					socket = null;
					break;
				}
				case socketActionTypes.SOCKET_SEND_MESSAGE_DO: {
					socket.emit("new-message", {
						message: action.message,
						roomId: action.roomId,
						tmpId: action.tmpId
					})
					break;
				}
				default: {
					return next(action);
				}
			}
		}
		return next(action);
	};
};

const createNewSocket = () => {
	console.log("ioClient - connect");
	return ioClient.connect(process.env.REACT_APP_SOCKET_NAMESPACE);
}

const socketMiddleware = createSocketMiddleware();

export default socketMiddleware;