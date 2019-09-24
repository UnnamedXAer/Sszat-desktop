import React, {  } from 'react';
import classes from './Users.module.css';

import Row from '../../components/SidePanel/Row/Row';

const Users = ({ isOpened, users }) => {

    const usersRows = [
        // <Row key={123} text="cykabl at111_1"  isOpened={isOpened}/>,
        // <Row key="1" text="cykablat " isOpened={isOpened} status={"afk"}  />,
        // <Row key="2" text="Kamil Tereszkiewicz" isOpened={isOpened} status={"long-afk"} />,
        // <Row key="3" text="cykablat 2user surname" isOpened={isOpened} status={"active"} />,
        // ...users.map(user => {

        //     const activeTime = user.lastActiveOn.getTime();
        //     const now = Date.now();
        //     let status = "active";
        //     if (now - 3*1000*60 > activeTime) {
        //         status = "afk";
        //     }
        //     else if (now - 10 * 1000 * 60 > activeTime) {
        //         status = "long-afk";
        //     }

        //     return (
        //         <Row key={user.id} text={user.name} isOpened={isOpened} status={status} />
        //     );
        // })
    ];

    return (
        <div className={classes.Users}>
            {usersRows}
        </div>
    );
}

export default Users;