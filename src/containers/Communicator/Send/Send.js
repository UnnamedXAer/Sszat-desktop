import React, { useState } from 'react';
import classes from './Send.module.css';
import TextField from '../../../components/Communicator/Send/TextField/TextField';
import SendAttachments from '../../../components/Communicator/Send/SendAttachments/SendAttachments';
import SendButton from '../../../components/Communicator/Send/SendButton/SendButton';
import SendOptions from '../../../components/Communicator/Send/SendOptions/SendOptions';

const Send = props => {
    
    const [currentText, setCurrentText] = useState("");
    const [isInputHighlighted, SendInputsContainerHighlight] = useState(false);
    
    const textChangeHandler = (ev) => {
        setCurrentText(ev.target.value);
    }

    const textFieldKeydownHandler = (ev) => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault();
            if (ev.target.value !== "") {
                formSubmitHandler(ev);
            }
        }
    }

    const formSubmitHandler = ev => {
        ev.preventDefault();
        console.log(ev);

        // clear textarea.
        setCurrentText("");

        //send message here.
    }

    const toggleHighlightHandler = (ev, highlight) => {
        SendInputsContainerHighlight(highlight);
    }

    return (
        <div className={classes.Send}>
            <SendAttachments />
            <form onSubmit={formSubmitHandler}>
                <div 
                    className={[classes.SendInputsContainer, isInputHighlighted ? classes.SendInputsContainerHighlight : null].join(" ")}
                >
                    <TextField
                        keyDown={textFieldKeydownHandler}
                        textChanged={textChangeHandler}
                        currentText={currentText}
                        toggleHighlight={toggleHighlightHandler}
                    />
                </div>
                <SendOptions
                    toggleHighlight={toggleHighlightHandler}
                />
                <SendButton />
            </form>
        </div>
    );
};

export default Send;