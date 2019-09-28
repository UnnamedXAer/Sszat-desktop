import React, { useState } from 'react';
import classes from './Communicator.module.css';

import Messages from './Messages/Messages';
import Send from './Send/Send';
import CommunicatorHeader from '../../components/Communicator/CommunicatorHeader/CommunicatorHeader';
import FullScreenPreview from '../../components/Communicator/FullScreenPreview/FullScreenPreview';

const Communicator = props => {

    const [messages, setMessages] = useState([]);
    const [displayedFile, setDisplayedFile] = useState(null);

    const attachmentClickHandlder = file => {
        setDisplayedFile(file);
    }

    const filePreviewCloseHandler = ev => {
        setDisplayedFile(null);
    }

    const newMessageHandler = msg => {
        console.log(msg);
        setMessages(prevState => prevState.concat(msg));
    };



    return (
        <div className={classes.Communicator}>
            <CommunicatorHeader title={props.headerText} />
            <Messages messages={messages} attachmentClicked={attachmentClickHandlder} />
            <Send draggedOverApp={props.draggedOverApp} addMessage={newMessageHandler} />
            {displayedFile && <FullScreenPreview file={displayedFile} closed={filePreviewCloseHandler} />}
        </div>
    );
}

export default Communicator;