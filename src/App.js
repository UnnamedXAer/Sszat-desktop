import React, { useState, useEffect } from 'react';
import classes from './App.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus, faCheck, faSquare,
	faSmile, faSmileBeam, faSmileWink, faSurprise, faTired, faLaugh, faLaughBeam, faLaughSquint, faLaughWink, faMeh, faMehBlank, faMehRollingEyes, faSadCry, faSadTear, faAngry, faDizzy, faFlushed, faFrown, faFrownOpen, faGrimace, faGrinAlt, faGrinBeam, faGrinBeamSweat, faGrinHearts, faGrinSquint, faGrinSquintTears, faGrinStars, faGrinTears, faGrinTongue, faGrinTongueSquint, faGrinWink, faKiss, faKissBeam, faKissWinkHeart,
	faStopwatch, faUtensils, faMugHot, faThumbsUp, faThumbsDown, faCircle, faQuestionCircle, faDesktop, faHome, faTimes,
	faDoorClosed, faDoorOpen, faCog
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';

import useWindowDimensions from './hooks/useWindowDimensions';
import SidePanel from './containers/SidePanel/SidePanel';
import SignIn from './containers/Auth/SignIn/SignIn';
import SignUp from './containers/Auth/SignUp/SignUp';
import AppLoading from './components/AppLoading/AppLoading';

import * as actions from './store/actions';
import { connect } from 'react-redux';
const { ipcRenderer } = window.require("electron");

// add selected awesome-fonts to library
library.add(
	faFacebook, faGithub, faGoogle,
	faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus, faCheck, faSquare, faSmile, faSmileBeam, faSmileWink, faSurprise, faTired, faLaugh, faLaughBeam, faLaughSquint, faLaughWink, faMeh, faMehBlank, faMehRollingEyes, faSadCry, faSadTear, faAngry, faDizzy, faFlushed, faFrown, faFrownOpen, faGrimace, faGrinAlt, faGrinBeam, faGrinBeamSweat, faGrinHearts, faGrinSquint, faGrinSquintTears, faGrinStars, faGrinTears, faGrinTongue, faGrinTongueSquint, faGrinWink, faKiss, faKissBeam, faKissWinkHeart, faStopwatch, faUtensils, faMugHot, faThumbsUp, faThumbsDown, faCircle, faQuestionCircle, faDesktop, faHome, faTimes, faDoorClosed, faDoorOpen, faCog);

function App({ 
	loggedUser, 
	appLoading, 
	fetchLoggedUser, 
	signOut, 
	setAppLoading, 
	showSettings,
	updateSettings,

	rooms,
	publicRoom, 
	fetchRooms, 
	activeRoom,
	areRoomsFetched,

	messages,
	fetchMessages,
	areMessagesLoadedForRoom,
	
	fetchUsers,
}) {

	const [showSignUp, setShowSignUp] = useState(false);
	const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);

	useEffect(() => {

		const sighOutHandler = (ev) => {
			signOut();
		};

		ipcRenderer.addListener("signOut", sighOutHandler);
		return () => {
			ipcRenderer.removeListener("signOut", sighOutHandler);
		};
	}, [signOut]);

	useEffect(() => {
		if (loggedUser) {
			const settings = localStorage.getItem(`settings-${loggedUser.id}`);
			if (settings) {
				updateSettings(JSON.parse(settings));
			}
		}
		else {
			const savedUserId = localStorage.getItem("loggedUserId");
			if (savedUserId) {
				fetchLoggedUser(savedUserId);
			}
			else {
				setAppLoading(false);
			}
		}
	}, [fetchLoggedUser, loggedUser, setAppLoading, updateSettings]);

	useEffect(() => {
		const roomForMessages = activeRoom;
		if (!areMessagesLoadedForRoom[roomForMessages]) {
			fetchMessages(roomForMessages);
		}
	}, [activeRoom, messages, areMessagesLoadedForRoom, fetchMessages]);

	useEffect(() => {
		if (loggedUser && !areRoomsFetched) {
			fetchRooms(loggedUser.id);
		}
	}, [loggedUser, areRoomsFetched, fetchRooms]);

	useEffect(() => {
		if (loggedUser) {
			fetchUsers();
		}
	}, [fetchUsers, loggedUser]);

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
	if (activeRoom !== publicRoom.id) {
		communicatorHeaderText = rooms.find(x => x.id === activeRoom).name;
	}

	const windowDimensions = useWindowDimensions();

	let content = <AppLoading />;

	if (appLoading) {
		return content;
	}
	else if (!loggedUser) {
		if (showSignUp) {
			content = <SignUp redirectToSignIn={() => setShowSignUp(false)} /> 
		}
		else {
			content = <SignIn redirectToSignUp={() => setShowSignUp(true)} />
		}
	}
	else if (showSettings) {
		content = <Settings />
	}
	else {
		content = (
			<>
				<Communicator
					messages={messages}
					draggedOverApp={isDraggedOverApp}
					headerText={communicatorHeaderText}
				/>
				<div className={classes.SidePanelsContainer}>
					<SidePanel windowDimensions={windowDimensions} >
						<Users
							isRoomOwner={(activeRoom !== publicRoom.id && rooms
								.find(x => x.id === activeRoom)
								.owner === loggedUser.id)}
						/>
					</SidePanel>
					<SidePanel windowDimensions={windowDimensions} >
						<Rooms
							publicRoom={publicRoom}
							rooms={rooms}
							activeRoom={activeRoom}
						/>
					</SidePanel>
				</div>
			</>);
	}

	return (
		<div
			className={classes.App}
			onDragStart={dragStartHandler}
			onDragEnd={dragEndHandler}
			onDrop={dropHandler}
			onDragOver={dragOverHandler}
		>
			{content}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		loggedUser: state.auth.loggedUser,
		appLoading: state.app.appLoading,
		rooms: state.rooms.rooms,
		publicRoom: state.rooms.publicRoom,
		activeRoom: state.rooms.activeRoom,
		activeRoomUsers: state.rooms.activeRoomUsers,
		areRoomsFetched: state.rooms.areRoomsFetched,
		messages: state.messages.messages[state.rooms.activeRoom],
		areMessagesLoadedForRoom: state.messages.areMessagesLoadedForRoom,
		showSettings: state.app.showSettings
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLoggedUser: (id) => dispatch(actions.fetchLoggedUser(id)),
		setAppLoading: (show) => dispatch(actions.setAppLoading(show)),
		setShowSettings: (show) => dispatch(actions.setShowSettings(show)),
		updateSettings: (settings) => dispatch(actions.updateSettings(settings)),
		signOut: () => dispatch(actions.signOutUser()),
		fetchRooms: (loggedUserId) => dispatch(actions.fetchRooms(loggedUserId)),
		fetchMessages: (roomId) => dispatch(actions.fetchMessages(roomId)),
		fetchUsers: () => dispatch(actions.fetchUsers())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);