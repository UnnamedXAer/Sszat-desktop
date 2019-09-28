import React, { useState, useEffect, useCallback } from 'react';
import classes from './App.module.css';

import axios from './axios/axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus, faCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';

import useWindowDimensions from './hooks/useWindowDimensions';
import SidePanel from './containers/SidePanel/SidePanel';

// add selected awesome-fonts to library
library.add(fab, faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus, faCheck, faSquare);

const publicRoom = {
	id: "public",
	name: "Public",
	createDate: new Date().toUTCString(),
	members: [
		"-Lp_3GnjamQtIcqpf5Pe",
		"-Lp_4GjjKpyiAaMVy7Hb",
		"-Lp_4QT-N3p_0vqShcbS"
	]
}

function App() {

	const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);
	const [users, setUsers] = useState([]);
	const [roomUsers, setRoomUsers] = useState([]);
	const [rooms, setRooms] = useState([publicRoom]);
	const [activeRoom, setActiveRoom] = useState(publicRoom.id);

	const selectRoomHandler = id => {
		setActiveRoom(id);
	};
	const getUsers = useCallback(() => {
		axios("/users.json")
			.then(res => {
				const newUsers = [];

				// eslint-disable-next-line no-unused-vars
				for (const key in res.data) {
					newUsers.push({
						...res.data[key],
						id: key
					});
				}

				setUsers(newUsers);
			})
			.catch(err => {
				console.log("err", err);
			});
	}, []);

	const getRooms = useCallback(() => {
		axios("/rooms.json")
			.then(res => {
				const rooms = [publicRoom];

				// eslint-disable-next-line no-unused-vars
				for (const key in res.data) {

					const room = res.data[key];
					const members = [];
					if (room.members) {
						// eslint-disable-next-line no-unused-vars
						for (const membersKey in room.members) {
							members.push(membersKey);
						}
					}

				rooms.push({
					name: room.name,
					createDate: room.createDate,
					owner: room.owner,
					members: members,
					id: key
				});
			}
			setRooms(rooms);
		})
		.catch(err => {
			console.log("err", err);
		});
}, []);

const newRoomHandler = () => {
	getRooms();
};

useEffect(() => {
	const room = rooms.find(x => x.id === activeRoom);
	if (!room || !room.members) 
		return console.log("Room not found!", activeRoom);

	const roomUsers = [];
	room.members.forEach(memberId => {
		const user = users.find(x => x.id === memberId);
		if (user) {
			roomUsers.push(user);
		}
	});
	setRoomUsers(roomUsers);

}, [activeRoom, rooms, users])

useEffect(() => {
	getUsers();
	getRooms();
}, [getUsers, getRooms]);

const dragStartHandler = ev => {
	ev.stopPropagation();
	if (!isDraggedOverApp) {
		setIsDraggedOverApp(true);
	}
};

const dragOverHandler = ev => {
	ev.stopPropagation();
	ev.preventDefault();
	if (!isDraggedOverApp) {
		setIsDraggedOverApp(true);
	}
};

const dragEndHandler = ev => {
	ev.stopPropagation();
	ev.preventDefault();
	if (isDraggedOverApp) {
		setIsDraggedOverApp(false);
	}
};

const dropHandler = ev => {
	ev.stopPropagation();
	ev.preventDefault();
	if (isDraggedOverApp) {
		setIsDraggedOverApp(false);
	}
};

const windowDimensions = useWindowDimensions();
return (
	<div
		className={classes.App}
		onDragStart={dragStartHandler}
		onDragEnd={dragEndHandler}
		onDrop={dropHandler}
		onDragOver={dragOverHandler}
	>
		<Settings />
		<Communicator draggedOverApp={isDraggedOverApp} headerText={rooms.find(x => x.id === activeRoom).name} />
		<div className={classes.SidePanelsContainer}>

			<SidePanel
				windowDimensions={windowDimensions}
				headerTitle="user name1 name2 ane m44"
				headerText="123 321 123"
			>
				<Users users={roomUsers} />
			</SidePanel>

			<SidePanel
				windowDimensions={windowDimensions}
				headerTitle="Users in RoomName"
				headerText="bl bla bla"
			>
				<Rooms rooms={rooms} addRoom={newRoomHandler} allUsers={users} selectRoom={selectRoomHandler} activeRoom={activeRoom} />
			</SidePanel>
		</div>
	</div>
);
}

export default App;