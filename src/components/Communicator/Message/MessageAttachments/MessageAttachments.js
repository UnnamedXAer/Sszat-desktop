import React, { useState } from 'react';
import classes from './MessageAttachments.module.css';
import MessageAttachment from './MessageAttachment/MessageAttachment';
import FullScreenPreview from '../../FullScreenPreview/FullScreenPreview';

const MessageAttachments = ({ isMyMessage, files}) => {

    const [displayedFile, setDisplayedFile] = useState(null);
    
    const attachmentClickHandler = file => {
        setDisplayedFile(file);
    }

    const filePreviewCloseHandler = ev => {
        setDisplayedFile(null);
    }

    if (!files || files.length === 0) {
        return [];
    }
    const isSingleFile = files.length === 1;
    const attachments =  files.map(file => (
        <MessageAttachment key={file.id} file={file} isSingleFile={isSingleFile} clicked={attachmentClickHandler} />
    ));

    return (
        <div className={[classes.MessageAttachments, (isMyMessage ? classes.My : classes.Your)].join(" ")}>
            {attachments}
            {displayedFile && <FullScreenPreview file={displayedFile} closed={filePreviewCloseHandler} />}
        </div>
    )
}

export default MessageAttachments;