import React from 'react';
import classes from './Communicator.module.css';

import Messages from './Messages/Messages';
import Send from './Send/Send';
import CommunicatorHeader from '../../components/Communicator/CommunicatorHeader/CommunicatorHeader';

const communicator = props => {
    return (
        <div className={classes.Communicator}>
            <CommunicatorHeader title="Conversation 11" />
            <Messages />
            <Send />
        </div>
    );
}

export default communicator;