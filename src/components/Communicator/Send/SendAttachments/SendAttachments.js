import React from 'react';
import classes from './SendAttachments.module.css';
import Attachment from './Attachment/Attachment';
import Tooltip from 'react-tooltip-lite';

const sendAttachments = React.memo(props => {

    const attachments = props.files.map(x => (
        <Tooltip 
            key={x.path} 
            content={x.path}
            background={getComputedStyle(document.documentElement).getPropertyValue('--color-bg-hover-aside')}
            color={getComputedStyle(document.documentElement).getPropertyValue('--color-font')}
        >
            <Attachment file={x.data} ext={x.ext} path={x.path} deleteAttachment={props.deleteAttachment} />
        </Tooltip>
    ));

    return (
        <div className={classes.SendAttachments} >
            <div className={classes.SendAttachmentsContainer} >
                {attachments}
                {attachments.length === 0 && props.draggedOverApp && <Attachment />}
            </div>
        </div>
    );
});

export default sendAttachments;