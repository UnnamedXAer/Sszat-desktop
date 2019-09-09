import React, { useState } from 'react';
import classes from './Send.module.css';
import TextField from '../../../components/Communicator/Send/TextField/TextField';
import SendAttachments from '../../../components/Communicator/Send/SendAttachments/SendAttachments';
import SendButton from '../../../components/Communicator/Send/SendButton/SendButton';
import SendOptionsToggler from '../../../components/Communicator/Send/SendOptionsToggler/SendOptionsToggler';
import SendOptions from '../../../components/Communicator/Send/SendOptions/SendOptions';
var linkify = require('linkify-it')();


function textToMessageParts(text) {
const x = linkify.match(text);
}

const Send = props => {
    
    const [currentText, setCurrentText] = useState("");
    const [isInputHighlighted, setIsInputHighlighted] = useState(false);
    const [areSenOptionsExpanded, setAreSenOptionsExpanded] = useState(false);
    
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

    const textFieldFocusHandler = (ev) => {
        setIsInputHighlighted(true);
        setAreSenOptionsExpanded(false);
    }

    const textFieldBlurHandler = ev => {
        setIsInputHighlighted(false);
    }

    const toggleSendOptionsHandler = (ev) => {
        setAreSenOptionsExpanded(currentState => !currentState);
    }

    return (
        <div className={classes.Send}>
            <SendAttachments />
            <form onSubmit={formSubmitHandler}>
                <div 
                    className={classes.SendInputsContainer}
                >
                    <TextField
                        collapseSendOptions={toggleSendOptionsHandler}
                        highlighted={isInputHighlighted}
                        sendOptionsExpanded={areSenOptionsExpanded}
                        keyDown={textFieldKeydownHandler}
                        textChanged={textChangeHandler}
                        currentText={currentText}
                        focused={textFieldFocusHandler}
                        blurred={textFieldBlurHandler}
                    />
                    <SendOptions
                        expanded={areSenOptionsExpanded}
                    />
                </div>
                <SendOptionsToggler
                    expanded={areSenOptionsExpanded}
                    clicked={toggleSendOptionsHandler}
                />
                <SendButton />
            </form>
        </div>
    );
};

export default Send;