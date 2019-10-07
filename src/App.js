import React, { useState, useEffect, useCallback } from 'react';
import classes from './App.module.css';

import axios from './axios/axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus, faCheck, faSquare,
  faSmile, faSmileBeam, faSmileWink, faSurprise, faTired, faLaugh, faLaughBeam, faLaughSquint, faLaughWink, faMeh, faMehBlank, faMehRollingEyes, faSadCry, faSadTear, faAngry, faDizzy, faFlushed, faFrown, faFrownOpen, faGrimace, faGrinAlt, faGrinBeam, faGrinBeamSweat, faGrinHearts, faGrinSquint, faGrinSquintTears, faGrinStars, faGrinTears, faGrinTongue, faGrinTongueSquint, faGrinWink, faKiss, faKissBeam, faKissWinkHeart
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';

import useWindowDimensions from './hooks/useWindowDimensions';
import SidePanel from './containers/SidePanel/SidePanel';

// add selected awesome-fonts to library
library.add(
  fab, 
  faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus, faCheck, faSquare, faSmile, faSmileBeam, faSmileWink, faSurprise, faTired, faLaugh, faLaughBeam, faLaughSquint, faLaughWink, faMeh, faMehBlank, faMehRollingEyes, faSadCry, faSadTear, faAngry, faDizzy, faFlushed, faFrown, faFrownOpen, faGrimace, faGrinAlt, faGrinBeam, faGrinBeamSweat, faGrinHearts, faGrinSquint, faGrinSquintTears, faGrinStars, faGrinTears, faGrinTongue, faGrinTongueSquint, faGrinWink, faKiss, faKissBeam, faKissWinkHeart);

const PUBLIC_ROOM = {
	id: "public",
	owner: "sszat Company",
	name: "Public",
	createDate: new Date().toUTCString(),
	members: []
};

const MY_ID = "-Lp_4GjjKpyiAaMVy7Hb";

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

const removeUserFromRoom = (roomId, userId) => {
	axios.delete(`/rooms/${roomId}/members/${userId}.json`)
		.then(res => {
			console.log("room left: ", roomId, userId, res);
		})
		.catch(err => {
			console.log('leave room err: ', err);
		});
};

function App() {

	const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);
	const [users, setUsers] = useState([]);
	const [activeRoomUsers, setActiveRoomUsers] = useState([]);
	const [publicRoom, setPublicRoom] = useState(PUBLIC_ROOM);
	const [rooms, setRooms] = useState([]);
	const [activeRoom, setActiveRoom] = useState(PUBLIC_ROOM.id);
	const [messages, setMessages] = useState({[publicRoom.id]: []});
	const [areMessagesDownloadedForRooms, setAreMessagesDownloadedForRooms] = useState({[publicRoom.id]: true}); // do not load messages for public room (for now at least)

	const selectRoomHandler = id => {
    prepareStateForRoomSelect(id);
		setActiveRoom(id);
  };
  
  const prepareStateForRoomSelect = roomId => {
    if (!messages.hasOwnProperty(roomId))
		// create array for active room messages 
			setMessages(prevMessages => ({...prevMessages, [roomId]: []}));
		if (!areMessagesDownloadedForRooms[roomId])
			setAreMessagesDownloadedForRooms(prevState => ({...prevState, [roomId]: false}))
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
				setPublicRoom(prevState => ({...prevState, members: newUsersId}));
			})
			.catch(err => {
				console.log("err", err);
			});
	}, []);

	useEffect(() => {
		const roomForMessages = activeRoom;
		if (!areMessagesDownloadedForRooms[roomForMessages]) {
		axios.get(`/messages/${activeRoom}.json`)
			.then(res => {
				setAreMessagesDownloadedForRooms(prevState => ({...prevState, [roomForMessages]: true}));
				setMessages(prevMessages => {
					// someone could send new message before download was completed.
					const roomMessages = [...prevMessages[roomForMessages]];
					const downloadedMessages = res.data;
					const formattedDownloadedMessages = [];
					// eslint-disable-next-line
					for (const messageId in downloadedMessages) {
						const downloadedMessage = {...downloadedMessages[messageId].msg};
						const message = {
							id: messageId,
							authorId: downloadedMessage.authorId || "UNNAMED-AUTHOR",
							parts: downloadedMessage.parts || [],
							time: downloadedMessage.time || new Date().toUTCString(),
							files: downloadedMessage.files || []
						}
						formattedDownloadedMessages.push(message);
					}


					const allRoomMessages = formattedDownloadedMessages.concat(roomMessages);
					// todo - sort -  not working 
					const x = allRoomMessages.sort((messageA, messageB) => {
						const messageATime = Date.parse(messageA.time);
						const messageBTime = Date.parse(messageB.time);
						console.log(messageATime - messageBTime);
						return messageATime - messageBTime;
					})
					console.log(x);
					console.log('allRoomMessages', allRoomMessages)
					return {...prevMessages, [roomForMessages]: allRoomMessages};
				})
			})
		}
	}, [activeRoom, messages, areMessagesDownloadedForRooms]);

	const getRooms = useCallback(() => {
		axios("/rooms.json")
			.then(res => {
				const newRooms = [];

				// eslint-disable-next-line no-unused-vars
				for (const key in res.data) {

					const newRoom = res.data[key];
					const members = mapObjectMembersToArrayMembers(newRoom.members);

					// logic for firebase use only
					if (members.includes(MY_ID))
						newRooms.push({
							name: newRoom.name,
							createDate: newRoom.createDate,
							owner: newRoom.owner,
							members: members,
							id: key
						});
					else {
						// room does not includes logged user
					}
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
      const activeRoomIndex = rooms.findIndex(x => x.id === id);
      let newActiveRoomId = id;
      if (activeRoomIndex === 0) {
        newActiveRoomId = publicRoom.id;
      }
			else {
        newActiveRoomId = rooms[activeRoomIndex-1].id;
			}
      prepareStateForRoomSelect(newActiveRoomId);
      setActiveRoom(newActiveRoomId);
		}
		setRooms(prevState => prevState.filter(x => x.id !== id));
	};

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
		removeRoomFromList(id);
		removeUserFromRoom(id, MY_ID);
	};

	useEffect(() => {
		let room;

		if (activeRoom === publicRoom.id) {
			room = publicRoom;
		}
		else {
			room = rooms.find(x => x.id === activeRoom);
		}
		if (!room || !room.members) 
			return console.log("Room not found!", activeRoom);

		const activeRoomUsers = [];
		room.members.forEach(memberId => {
			const user = users.find(x => x.id === memberId);
			if (user) {
				activeRoomUsers.push(user);
			}
		});
		setActiveRoomUsers(activeRoomUsers);

	}, [activeRoom, rooms, users, publicRoom])

	useEffect(() => {
		getUsers();
		getRooms();
	}, [getUsers, getRooms]);

	const removeUserFromRoomHandler = (userId) => { 
		setRooms(prevState => {
			const roomIndex = rooms.findIndex(x => x.id === activeRoom);
			const updatedRooms = [...prevState];
			const updatedMembers = updatedRooms[roomIndex].members.filter(x => x !== userId)
			updatedRooms[roomIndex] = {...updatedRooms[roomIndex], members: updatedMembers};
			return updatedRooms;
		});
		setActiveRoomUsers(prevState => prevState.filter(x => x !== userId));
		removeUserFromRoom(activeRoom, userId);
	};

	const createRoomWithUserHandler = (userId) => {
		const newRoom = {
			name: users.find(x => x.id === userId).name.split(" ")[0] + " & " + users.find(x => x.id === MY_ID).name.split(" ")[0],
			createDate: new Date().toUTCString(),
			owner: MY_ID,
			members: {
				[MY_ID]: true, 
				[userId]: true
			}
		};

		axios.post(`/rooms.json`, newRoom)
			.then(res => {
				newRoom.id = res.data.name;
				newRoom.members = mapObjectMembersToArrayMembers(newRoom.members);

        setRooms(prevState => prevState.concat(newRoom));
        prepareStateForRoomSelect(newRoom.id);        
				setActiveRoom(newRoom.id);
			})
			.catch(err => {
				console.log("error on new conversation: ", err);
			});
	};

	const sendMessageHandler = msg => {
		// save current room in case user change it before response 
		const messageRoom = activeRoom;

		// create temporary id
		const tmpId = msg.id;

		// instantly display my message
		setMessages(prevState => {
			const newMessages = {...prevState};
			newMessages[messageRoom] = newMessages[messageRoom].concat({...msg, id: tmpId});
			return newMessages;
		});

		axios.post(`/messages/${messageRoom}.json`, {msg})
			.then(res => {
				setMessages(prevState => {
					msg.id = res.data.name;

					const newMessages = {...prevState};
					// we could probably use messages[messageRoom].length
          
					const updatedRoomMsgs = [...newMessages[messageRoom]];
					const updatedMsgIndex = updatedRoomMsgs.findIndex(x => x.id === tmpId);
					updatedRoomMsgs[updatedMsgIndex] = msg;
					newMessages[messageRoom] = updatedRoomMsgs;

					return newMessages;
				});
      })
      .catch(err => {
        console.log('pos-message-err: ', err);
      })
	};

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

	let communicatorHeaderText = "Public";
	if (activeRoom !== "public") {
		communicatorHeaderText = rooms.find(x => x.id === activeRoom).name;
  }  
  
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
			<Communicator 
				messages={messages[activeRoom]}
				sendMessage={sendMessageHandler}
				draggedOverApp={isDraggedOverApp} 
				headerText={communicatorHeaderText}
			 />
			<div className={classes.SidePanelsContainer}>

				<SidePanel
					windowDimensions={windowDimensions}
				>
					<Users 
						isRoomOwner={activeRoom !== publicRoom.id && rooms.find(x => x.id === activeRoom).owner === MY_ID}
						users={activeRoomUsers}
						removeUser={removeUserFromRoomHandler}
						createRoomWithUser={createRoomWithUserHandler}	
					/>
				</SidePanel>

				<SidePanel
					windowDimensions={windowDimensions}
				>
					<Rooms 
						publicRoom={publicRoom}
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