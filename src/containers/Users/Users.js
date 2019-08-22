import React, { useState } from 'react';
import classes from './Users.module.css';

import SidePanel from '../SidePanel/SidePanel';

const Users = props => {

    const [isOpened, setIsOpened] = useState(true);

    return (
        <SidePanel opened={isOpened} headerTitle="Users in Room" >
            <div className={classes.Users}>
                <div style={{width: '90%', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
                <div style={{width: '150px', height: '25px', margin: '4px', border: '1px solid green'}}></div>
            </div>
        </SidePanel>
    );
}

export default Users;