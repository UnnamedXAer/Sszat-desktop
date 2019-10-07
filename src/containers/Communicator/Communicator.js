import React, { useState } from 'react';
import classes from './Communicator.module.css';

import Messages from './Messages/Messages';
import Send from './Send/Send';
import CommunicatorHeader from '../../components/Communicator/CommunicatorHeader/CommunicatorHeader';
import FullScreenPreview from '../../components/Communicator/FullScreenPreview/FullScreenPreview';

const Communicator = ({
    headerText,
    messages,
    draggedOverApp,
    sendMessage
}) => {

    // const [messages, setMessages] = useState([]);
    const [displayedFile, setDisplayedFile] = useState(null);

    const attachmentClickHandler = file => {
        setDisplayedFile(file);
    }

    const filePreviewCloseHandler = ev => {
        setDisplayedFile(null);
    }

    return (
        <div className={classes.Communicator}>
            <CommunicatorHeader title={headerText} />
            <Messages messages={messages} attachmentClicked={attachmentClickHandler} />
            <Send draggedOverApp={draggedOverApp} sendMessage={sendMessage} />
            {displayedFile && <FullScreenPreview file={displayedFile} closed={filePreviewCloseHandler} />}
        </div>
    );
}

export default Communicator;