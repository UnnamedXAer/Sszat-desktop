import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SOCKET_NAMESPACE);

socket.on("FromAPI", (data) => {
    console.log("----SOCKET----FromAPI", data);
});

socket.emit("activeRoom", { roomId: 13 });

socket.on("activeRoomUpdated", (data) => {
    console.log("----SOCKET----activeRoomUpdated", data);
});

export default socket;