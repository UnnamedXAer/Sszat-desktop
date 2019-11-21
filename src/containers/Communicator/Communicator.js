import React from 'react';
import classes from './Communicator.module.css';

import Messages from './Messages/Messages';
import Send from './Send/Send';
import CommunicatorHeader from '../../components/Communicator/CommunicatorHeader/CommunicatorHeader';

const Communicator = ({
    headerText,
    messages,
    draggedOverApp,
}) => {

    return (
        <div className={classes.Communicator}>
            <CommunicatorHeader title={headerText} />
            <Messages messages={messages} />
            <Send draggedOverApp={draggedOverApp} />
        </div>
    );
}

export default Communicator;