import React from 'react';
import classes from './SendAttachments.module.css';

const sendAttachments = props => {

    const attachments = [];

    return (
        <div className={classes.SendAttachments} >
            {attachments}
        </div>
    )
}

export default sendAttachments