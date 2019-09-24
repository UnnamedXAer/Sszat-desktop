import React, {  } from 'react';
import classes from './Users.module.css';

import SidePanel from '../SidePanel/SidePanel';
import Row from '../../components/SidePanel/Row/Row';

const Users = props => {
    const users_TEMP = [{
        name: "John Silver",
        lastActiveOn: new Date()
    }];

    const users = (isOpened) => (
        <div className={classes.Users}>
            <Row text="cykablat 2user surname" isOpened={isOpened} status={"afk"}  />
            <Row text="cykablat 2user surname" isOpened={isOpened} status={"long-afk"} />
            <Row text="cykablat 2user surname" isOpened={isOpened} status={"active"} />
            {users_TEMP.map(user => {

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
                    <Row text={user.name} isOpened={isOpened} status={status} />
                );
            })}
        </div>
    );

    return (
        <SidePanel windowDimensions={props.windowDimensions}
            headerTitle="Users in RoomName"
            headerText="bla bla bla" >
            {users}
        </SidePanel>
    );
}

export default Users;