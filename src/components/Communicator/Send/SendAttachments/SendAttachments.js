import React, { useRef } from 'react';
import classes from './SendAttachments.module.css';
import Attachment from './Attachment/Attachment';
import Tooltip from 'react-tooltip-lite';

const sendAttachments = React.memo(props => {

    const attachmentsContainerRef = useRef();

    const attachments = props.files.map(x => (
        <Tooltip 
            key={x.id} 
            content={x.path || x.name}
            background={getComputedStyle(document.documentElement).getPropertyValue('--color-bg-hover-aside')}
            color={getComputedStyle(document.documentElement).getPropertyValue('--color-font')}
        >
            <Attachment file={x.data} ext={x.ext} id={x.id} deleteAttachment={props.deleteAttachment} />
        </Tooltip>
    ));

    const wheelHandler = (ev) => {
        var delta = - 20 * (Math.max(-1, Math.min(1, (ev.nativeEvent.wheelDelta || -ev.nativeEvent.detail))));
    
        var pst = attachmentsContainerRef.current.scrollLeft + delta;
        if (pst < 0) {
            pst = 0;
        } else if (pst > attachmentsContainerRef.current.scrollWidth) {
            pst = attachmentsContainerRef.current.scrollWidth;
        }
    
        attachmentsContainerRef.current.scrollLeft = pst;
    
        return false;
    }

    return (
        <div className={classes.SendAttachments} >
            <div className={classes.SendAttachmentsContainer} onWheel={wheelHandler} ref={attachmentsContainerRef} >
                {attachments}
                {attachments.length === 0 && props.draggedOverApp && <Attachment />}
            </div>
        </div>
    );
});

export default sendAttachments;