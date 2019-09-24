import React, {  } from 'react';
import classes from './Users.module.css';

import SidePanel from '../SidePanel/SidePanel';
import Row from '../../components/SidePanel/Row/Row';

const Users = ({ isOpened/*, users */}) => {

    // todo remove - temporary data
    const users_TEMP = [{
        id: "123123123",
        name: "John Silver",
        lastActiveOn: new Date()
    }];

    const users = [
        <Row key="1" text="cykablat 2user surname" isOpened={isOpened} status={"afk"}  />,
        <Row key="2" text="cykablat 2user surname" isOpened={isOpened} status={"long-afk"} />,
        <Row key="3" text="cykablat 2user surname" isOpened={isOpened} status={"active"} />,
        ...users_TEMP.map(user => {

            const activeTime = user.lastActiveOn.getTime();
            const now = Date.now();
            let status = "active";
            if (now - 3*1000*60 > activeTime) {
                status = "afk";
            }
            else if (now - 10 * 1000 * 60 > activeTime) {
                status = "long-afk";
            }

            return (
                <Row key={user.id} text={user.name} isOpened={isOpened} status={status} />
            );
        })
    ];

    return (
        <div className={classes.Users}>
            {users}
        </div>
    );
}

export default Users;