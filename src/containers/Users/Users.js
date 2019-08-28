import React, { useState } from 'react';
import classes from './Users.module.css';

import SidePanel from '../SidePanel/SidePanel';
import Row from '../../components/SidePanel/Row/Row';

const Users = props => {

    const users = (isOpened) => (
        <div className={classes.Users}>
            <Row text="cykablat 1" />
            <Row text="cykablat 2user" isOpened={isOpened}  />
            <Row text="cykablat 3"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat"  />
            <Row text="cykablat last lassat lsafd 4gwgv"  />
        </div>
    );

    return (
        <SidePanel 
            headerTitle="Users in RoomName"
            headerText="zxc czxcd vfvd" >
            {users}
        </SidePanel>
    );
}

export default Users;