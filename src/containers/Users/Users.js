import React, { useEffect } from 'react';
import classes from './Users.module.css';
import User from '../../components/User/User';
import { connect } from 'react-redux'
import * as actions from '../../store/actions';


const Users = ({ 
	isOpened, 
	users, 
	isRoomOwner, 
	removeUserFromRoom, 
	loggedUser, 
	activeRoom, 
	createRoom, 
	activeRoomUsers,
	setActiveRoomUsers
 }) => {

	useEffect(() => {
		if (loggedUser) {
			setActiveRoomUsers();
		}
	}, [setActiveRoomUsers, activeRoom, loggedUser, users])

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

	const now = Date.now();
    const usersRows = [
		
		activeRoomUsers.map(user => {
			const isCurentUser = user.id === loggedUser.id;
            const userMenuItems = [];

			if (!isCurentUser) {
                userMenuItems.push({
                    label: "New Conversation",
					click: () => createRoomWithUserHandler(user.id)
                });
			}
			if (isRoomOwner && !isCurentUser) {
                userMenuItems.push({
                    label: "Remove User",
					click: () => removeUserFromRoom(activeRoom, user.id)
                });
            }
            let status = "active";
			if (user.isOnline) {
				const activeTime = user.lastActiveOn;
				if (now - 10 * 1000 * 60 > activeTime) {
					status = "long-afk";
				}
				else if (now - 3*1000*60 > activeTime) {
					status = "afk";
				}
			}
			else {
				status = "offline"
			}
            return (
                <User 
                    key={user.id} 
                    profileUrl={user.profileUrl} 
                    avatar={user.avatar} 
                    text={user.userName} 
                    isOpened={isOpened} 
					status={status}
					isCurentUser={isCurentUser}
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
	removeUserFromRoom: (roomId, userId) => dispatch(actions.removeUserFromRoom(roomId, userId)),
	createRoom: (room) => dispatch(actions.createRoom(room)),
	setActiveRoomUsers: (users) => dispatch(actions.setActiveRoomUsers(users))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);