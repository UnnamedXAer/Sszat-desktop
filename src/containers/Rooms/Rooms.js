import React, { useState } from 'react';
import classes from './Rooms.module.css';

const Rooms = props => {

    const [openState, setOpenState] = useState("opened");

    return (
        <div className={[classes.Rooms, classes[openState]].join(" ")} onClick={() => {
            setOpenState(openState == 'opened' ? 'closed' : 'opened');
        }}>
            <div style={{width: '100%', height: '25px', margin: '4px', border: '1px solid green'}}></div>
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
    );
}

export default Rooms;