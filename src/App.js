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

const PUBLIC_ROOM = {
	id: "public",
	owner: "kt",
	name: "Public",
	createDate: new Date().toUTCString(),
	members: []
};

const mapObjectMembersToArrayMembers = members => {
	const arrMembers = [];
	if (members) {
		// eslint-disable-next-line
		for (const member in members) {
			if (members.hasOwnProperty(member)) {
				arrMembers.push(member);
			}
		}
	}
	return arrMembers;
}

function App() {

	const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);
	const [users, setUsers] = useState([]);
	const [activeRoomUsers, setActiveRoomUsers] = useState([]);
	// todo - mb make additional state for public room
	const [rooms, setRooms] = useState([PUBLIC_ROOM]);
	const [activeRoom, setActiveRoom] = useState(PUBLIC_ROOM.id);

	const selectRoomHandler = id => {
		setActiveRoom(id);
	};
	const getUsers = useCallback(() => {
		axios("/users.json")
			.then(res => {
				const newUsers = [];
				const newUsersId = [];
				// eslint-disable-next-line no-unused-vars
				for (const key in res.data) {
					newUsers.push({
						...res.data[key],
						id: key
					});
					newUsersId.push(key);
				}
				setUsers(newUsers);
				setRooms(prevState => {
					// to update state the newState variable is needed
					const newState = [...prevState];
					newState[0] = {...newState[0], members: newUsersId};
					return newState;
				});
			})
			.catch(err => {
				console.log("err", err);
			});
	}, []);

	const getRooms = useCallback(() => {
		axios("/rooms.json")
			.then(res => {
				const newRooms = [PUBLIC_ROOM];

				// eslint-disable-next-line no-unused-vars
				for (const key in res.data) {

					const newRoom = res.data[key];
					const members = mapObjectMembersToArrayMembers(newRoom.members);

					newRooms.push({
					name: newRoom.name,
					createDate: newRoom.createDate,
					owner: newRoom.owner,
					members: members,
					id: key
				});
			}
			setRooms(newRooms);
		})
		.catch(err => {
			console.log("err", err);
		});
	}, []);

	const addRoomHandler = (room) => {
		const _room = {...room, members: mapObjectMembersToArrayMembers(room.members)};
		setRooms(prevState => prevState.concat(_room));
	};

	const removeRoomFromList = (id) => {
		if (id === activeRoom) {
			const activeRoomIndex = rooms.findIndex(x => x.id === id) 
			// first room is always the "Public" room so no need to check if activeRoomIndex is 0
			setActiveRoom(rooms[activeRoomIndex-1].id);
		}
		setRooms(prevState => prevState.filter(x => x.id !== id));
	}

	const deleteRoomHandler = (id) => {
		removeRoomFromList(id);
		axios.delete(`/rooms/${id}.json`)
			.then(res => {
				console.log("deleted room: ", res)
			})
			.catch(err => {
				console.log("error on room remove: ",err);
			});
	};

	const leaveRoomHandler = (id) => {

		// todo - not working!

		removeRoomFromList(id);
		axios.delete(`/rooms/${id}/members/-Lp_4GjjKpyiAaMVy7Hb.json`)
			.then(res => {
				debugger;
				console.log("room aboandoded: ", id);
			})
			.catch(err => {
				console.log('leave room err: ', err);
			})
	}

	useEffect(() => {
		const room = rooms.find(x => x.id === activeRoom);
		if (!room || !room.members) 
			return console.log("Room not found!", activeRoom);

		const activeRoomUsers = [];
		room.members.forEach(memberId => {
			const user = users.find(x => x.id === memberId);
			if (user) {
				activeRoomUsers.push(user);
			}
		});
		console.log(activeRoomUsers)
		setActiveRoomUsers(activeRoomUsers);

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
					<Users users={activeRoomUsers} />
				</SidePanel>

				<SidePanel
					windowDimensions={windowDimensions}
					headerTitle="Users in RoomName"
					headerText="bl bla bla"
				>
					<Rooms 
						rooms={rooms} 
						addRoom={addRoomHandler} 
						deleteRoom={deleteRoomHandler}
						leaveRoom={leaveRoomHandler}
						allUsers={users} 
						selectRoom={selectRoomHandler} 
						activeRoom={activeRoom} 
					/>
				</SidePanel>
			</div>
		</div>
	);
}

export default App;