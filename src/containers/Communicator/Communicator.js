import React, { useState } from 'react';
import classes from './Communicator.module.css';

import Messages from './Messages/Messages';
import Send from './Send/Send';
import CommunicatorHeader from '../../components/Communicator/CommunicatorHeader/CommunicatorHeader';

const Communicator = props => {

    const [messages, setMessages] = useState([]);

    const newMessageHandler = msg => {
        console.log(msg);
        setMessages(prevState => prevState.concat(msg));
    };

    return (
        <div className={classes.Communicator}>
            <CommunicatorHeader title="Conversation 11" />
            <Messages messages={messages} />
            <Send dragOver={props.dragOver} addMessage={newMessageHandler} />
        </div>
    );
}

export default Communicator;