import React from 'react';
import classes from './Messages.module.css';
import Message from '../../../components/Communicator/Message/Message';

const Messages = props => {
    return (
        <div className={classes.Messages} >
            {props.messages.map(x => {
                return   <Message key={x.id} msg={x} />
            })}
        </div>
    );
}

export default Messages;