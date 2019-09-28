import React, {  } from 'react';
import classes from './Users.module.css';

import User from '../../components/User/User';

const Users = ({ isOpened, users }) => {

    const usersRows = [
        users.map(user => {
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
                <User key={user.id} profileUrl={user.profileUrl} avatar={users.avatar} text={user.name} isOpened={isOpened} status={status} />
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