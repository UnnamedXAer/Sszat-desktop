import React, {  } from 'react';
import classes from './Users.module.css';

import SidePanel from '../SidePanel/SidePanel';
import Row from '../../components/SidePanel/Row/Row';

const Users = props => {

    const users = (isOpened) => (
        <div className={classes.Users}>
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"afk"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"long-afk"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"active"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"active"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened}  />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"active"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"active"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"active"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened} status={"active"} />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened}  />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened}  />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened}  />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened}  />
            <Row text="cykablat 2user surname" showCloseBtn isOpened={isOpened}  />

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