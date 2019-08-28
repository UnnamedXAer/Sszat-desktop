import React, { useState } from 'react';
import classes from './Send.module.css';
import TextField from '../../../components/Communicator/Send/TextField/TextField';
import SendAttachments from '../../../components/Communicator/Send/SendAttachments/SendAttachments';
import SendButton from '../../../components/Communicator/Send/SendButton/SendButton';
import SendOptions from '../../../components/Communicator/Send/SendOptions/SendOptions';

const Send = props => {

    const [currentText, setCurrentText] = useState("");

    const textChangeHandler = (ev) => {
        setCurrentText(ev.target.value);
    }

    const formSubmitHandler = ev => {
        ev.preventDefault();
        console.log(currentText);

        // clear textarea.
        setCurrentText("");
        //send message here.
    }

    return (
        <div className={classes.Send}>
            <SendAttachments />
            <form onSubmit={formSubmitHandler}>
                <TextField
                    textChanged={textChangeHandler}
                    currentText={currentText}
                />
                <SendOptions />
                <SendButton />
            </form>
        </div>
    );
};

export default Send;