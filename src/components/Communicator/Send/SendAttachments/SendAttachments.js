import React from 'react';
import classes from './SendAttachments.module.css';
import Attachment from './Attachment/Attachment';

const sendAttachments = React.memo(props => {

    const attachments = props.files.map(x => <Attachment key={x.path} file={x.file} ext={x.ext} path={x.path} deleteAttachment={props.deleteAttachment} />);


    return (
        <div className={classes.SendAttachments} >
            <div className={classes.SendAttachmentsContainer} >
                {attachments}
                {attachments.length === 0 && props.dragOver && <Attachment />}
                {props.dragOver && <div className={classes.DragOverMask} >Drop here to add a file.</div>}
            </div>
        </div>
    );
});

export default sendAttachments;