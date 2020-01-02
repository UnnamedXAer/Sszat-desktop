import React, { useEffect, useRef } from 'react';
import classes from './Users.module.css';
import User from '../../components/User/User';
import { connect } from 'react-redux'
import * as actions from '../../store/actions';


const Users = ({ 
	isOpened, 
	users, 
	isRoomOwner, 
	kickUserFromRoom, 
	loggedUser, 
	activeRoom, 
	createRoom, 
	activeRoomUsers,
	setActiveRoomUsers,
	updateUsersStatuses
 }) => {

	useEffect(() => {
		if (loggedUser) {
			setActiveRoomUsers();
		}
	}, [setActiveRoomUsers, activeRoom, loggedUser, users]);

	const updateStatusesTimeout = useRef(null);

	useEffect(() => {
		updateStatusesTimeout.current = setInterval(() => {
			console.log("updateUsersStatuses", new Date().toLocaleTimeString());
			updateUsersStatuses();
		}, 1000 * 10);

		return () => {
			clearTimeout(updateStatusesTimeout.current);
			updateStatusesTimeout.current = null;
		};
	}, [updateUsersStatuses]);

	const createRoomWithUserHandler = (userId) => {
		const newRoom = {
			name: users.find(x => x.id === userId).userName.split(" ")[0] + " & " + users.find(x => x.id === loggedUser.id).userName.split(" ")[0],
			owner: loggedUser.id,
			createBy: loggedUser.id,
			members: [
				loggedUser.id,
				userId
			]
		};
		createRoom(newRoom);
	};

	// const now = Date.now();
    const usersRows = [
		
		activeRoomUsers.map(user => {
			const isCurrentUser = user.id === loggedUser.id;
            const userMenuItems = [];

			if (!isCurrentUser) {
                userMenuItems.push({
                    label: "New Conversation",
					click: () => createRoomWithUserHandler(user.id)
                });
			}
			if (isRoomOwner && !isCurrentUser) {
                userMenuItems.push({
                    label: "Remove User",
					click: () => kickUserFromRoom(activeRoom, user.id)
                });
            }

            return (
                <User 
                    key={user.id} 
                    profileUrl={user.profileUrl} 
					avatar={user.avatarUrl} 
                    text={user.userName} 
                    isOpened={isOpened} 
					status={user.status}
					isCurrentUser={isCurrentUser}
                    menuItems={userMenuItems}
                />
            );
        })
    ];

    return (
        <div className={classes.Users}>
            {usersRows}
        </div>
    );
}

const mapStateToProps = (state) => ({
	loggedUser: state.auth.loggedUser,
	activeRoom: state.rooms.activeRoom,
	users: state.users.users,
	activeRoomUsers: state.rooms.activeRoomUsers
});

const mapDispatchToProps = dispatch => ({
	kickUserFromRoom: (roomId, userId) => dispatch(actions.kickUserFromRoom(roomId, userId)),
	createRoom: (room) => dispatch(actions.createRoom(room)),
	setActiveRoomUsers: (users) => dispatch(actions.setActiveRoomUsers(users)),
	updateUsersStatuses: () => dispatch(actions.updateUsersStatuses())
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);