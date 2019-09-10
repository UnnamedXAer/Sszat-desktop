import React, { useState } from 'react';
import uuid from 'uuid/v1';
import classes from './Send.module.css';
import TextField from '../../../components/Communicator/Send/TextField/TextField';
import SendAttachments from '../../../components/Communicator/Send/SendAttachments/SendAttachments';
import SendButton from '../../../components/Communicator/Send/SendButton/SendButton';
import SendOptionsToggler from '../../../components/Communicator/Send/SendOptionsToggler/SendOptionsToggler';
import SendOptions from '../../../components/Communicator/Send/SendOptions/SendOptions';
const linkify = require('linkify-it')();

function textToMessageParts(text) {
    let parts = [];
    const urls = linkify.match(text);
    const urlParts = [];

    debugger;

    if (urls) {
        for (let i = 0; i < urls.length; i++) {

            const startIndex = urls[i-1] ? urls[i-1].lastIndex : 0;

            parts.push({ // get text before current url
                startIndex: startIndex,
                // lastIndex: urls[i].index,
                type: 'unformated',
                content: text.substring(startIndex, urls[i].index)
            });

            parts.push({
                startIndex: urls[i].index,
                // lastIndex: urls[i].lastIndex,
                type: 'url',
                content: urls[i].raw,
                url: urls[i].url
            });

            if (!urls[i+1]) { // get text placed after last url
                parts.push({
                    startIndex: urls[i].lastIndex,
                    // lastIndex: text.length,
                    type: 'unformated',
                    content: text.substring(urls[i].lastIndex)
                });
            }
        }
    }
    else {

    }


    parts = parts.map(x => ({...x, type: x.type === 'unformated' ? "text" : x.type}));

    parts.sort((a , b) => a.startIndex < b.startIndex);
    debugger;
    return parts.concat(urlParts);
}

const Send = props => {
    
    const [currentText, setCurrentText] = useState("fsfsdf sfd sadf www.dd.pl dsfsadf sadfsaf asdfasfd fsfsdf sfd sadf www.dd.pl dsfsadf sadfsaf asdfasfdfsfsdf sfd sadf www.dd.pl dsfsadf sadfsaf asdfasfd");
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

        const msgParts = textToMessageParts(currentText);

        // clear textarea.
        // setCurrentText("");

        const msg = {
            id: ("myId"+ uuid()) + uuid(),
            authorId: "myId"+ uuid(),
            time: new Date().toUTCString(),
            parts: msgParts
        };
        
        props.addMessage(msg);
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