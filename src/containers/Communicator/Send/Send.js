import React from 'react';
import classes from './Send.module.css';
import TextField from '../../../components/Communicator/Send/TextField/TextField';
import SendAttachments from '../../../components/Communicator/Send/SendAttachments/SendAttachments';

const send = props => {
    return (
        <div className={classes.Send}>
            <SendAttachments />
            <TextField />
        </div>
    );
};

export default send;