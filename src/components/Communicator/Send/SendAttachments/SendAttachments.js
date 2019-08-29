import React from 'react';
import classes from './SendAttachments.module.css';

const sendAttachments = props => {

    const attachments = [
        // <div key="1" className={classes.Thumb} ></div>,
        // <div key="12" className={classes.Thumb} ></div>,
        // <div key="11" className={classes.Thumb} ></div>,
        // <div key="121" className={classes.Thumb} ></div>
    ];

    return (
        <div className={classes.SendAttachments} >
            {attachments}
        </div>
    );
};

export default sendAttachments;