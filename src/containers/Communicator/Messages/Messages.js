import React from 'react';
import classes from './Messages.module.css';
import Message from '../../../components/Communicator/Message/Message';

const Messages = props => {
    return (
        <div className={classes.Messages} >
            {props.messages.map(x => (
                <Message key={x.id} msg={x} attachmentClicked={props.attachmentClicked} />
            ))}
        </div>
    );
}

export default Messages;