import React, {  } from 'react';
import classes from './Users.module.css';
import User from '../../components/User/User';

const MY_ID = "-Lp_4GjjKpyiAaMVy7Hb";

const Users = ({ isOpened, users, isRoomOwner, removeUser, createRoomWithUser }) => {

    const usersRows = [
        users.map(user => {

            const userMenuItems = [];

            if (user.id !== MY_ID) {
                userMenuItems.push({
                    label: "New Conversation",
                    click: () => createRoomWithUser(user.id)
                });
            }
            if (isRoomOwner && user.id !== MY_ID) {
                userMenuItems.push({
                    label: "Remove User",
                    click: () => removeUser(user.id)
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

export default Users;