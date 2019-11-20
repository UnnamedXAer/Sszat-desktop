import React, {  } from 'react';
import classes from './Users.module.css';
import User from '../../components/User/User';
import { connect } from 'react-redux'
import * as actions from '../../store/actions';


const Users = ({ isOpened, users, isRoomOwner, removeUserFromRoom, createRoomWithUser, loggedUser, activeRoom }) => {

    const usersRows = [
        users.map(user => {

            const userMenuItems = [];

			if (user.id !== loggedUser.id) {
                userMenuItems.push({
                    label: "New Conversation",
                    click: () => createRoomWithUser(user.id)
                });
            }
			if (isRoomOwner && user.id !== loggedUser.id) {
                userMenuItems.push({
                    label: "Remove User",
					click: () => removeUserFromRoom(activeRoom, user.id)
                });
            }

            const activeTime = new Date(user.lastActiveDate || "Sat, 28 Sep 2019 12:08:02 GMT").getTime();
            const now = Date.now();
            let status = "active";
            if (now - 10 * 1000 * 60 > activeTime) {
                status = "long-afk";
            }
            else if (now - 3*1000*60 > activeTime) {
                status = "afk";
            }
            
            return (
                <User 
                    key={user.id} 
                    profileUrl={user.profileUrl} 
                    avatar={user.avatar} 
                    text={user.name} 
                    isOpened={isOpened} 
                    status={status}
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
	activeRoom: state.rooms.activeRoom
});

const mapDispatchToProps = dispatch => ({
	removeUserFromRoom: (roomId, userId) => dispatch(actions.removeUserFromRoom(roomId, userId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Users);