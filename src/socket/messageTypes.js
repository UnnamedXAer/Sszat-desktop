// import keyMirror from '../utils/keyMirror/keyMirror';

// const messageTypes = keyMirror(
// 	"MESSAGE_NEW",
//     "ROOM_NEW"
// );

// export default messageTypes;
export default {
    USER_ONLINE: "USER_ONLINE",
    USER_OFFLINE: "USER_OFFLINE",

	MESSAGE_NEW: "MESSAGE_NEW",
    MESSAGE_NEW_FINISH: "MESSAGE_NEW_FINISH",
    MESSAGE_NEW_FAIL: "MESSAGE_NEW_FAIL",
    
    ROOM_NEW: "ROOM_NEW",
    ROOM_NEW_FINISH: "ROOM_NEW_FINISH",
    ROOM_NEW_FAIL: "ROOM_NEW_FAIL",

    ROOM_DELETE: "ROOM_DELETE",
    ROOM_DELETE_FINISH: "ROOM_DELETE_FINISH",
    ROOM_DELETE_FAIL: "ROOM_DELETE_FAIL",

    ROOM_LEAVE: "ROOM_LEAVE",
    ROOM_LEAVE_FINISH: "ROOM_LEAVE_FINISH",
    ROOM_LEAVE_FAIL: "ROOM_LEAVE_FAIL",

    ROOM_KICK_USER: "ROOM_KICK_USER",
    ROOM_KICK_USER_FINISH: "ROOM_KICK_USER_FINISH",
    ROOM_KICK_USER_FAIL: "ROOM_KICK_USER_FAIL"
};