import io from 'socket.io-client';
import messageTypes from './messageTypes';

let socket;

const init = (dispatch, rootURL) => {
    socket = io(rootURL);

    Object.keys(messageTypes).forEach(key => 
        socket.on(key, data => {
            const { type, payload } = data;
            dispatch({
                type,
                payload
            });
        })
    );
};

const emit = (type, payload) => socket && socket.emit(type, payload);

const emitAction = action => {
    return (...args) => {
        const result = action.apply(this, args);
        if (socket) {
            socket.emit(result.key, { ...result.payload, type: result.type });
        }
        return result;
    };
};

export { init, emit, emitAction };