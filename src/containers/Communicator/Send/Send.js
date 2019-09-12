import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'; // todo (supportedLanguages) do it better
import uuid from 'uuid/v1';
import classes from './Send.module.css';
import TextField from '../../../components/Communicator/Send/TextField/TextField';
import SendAttachments from '../../../components/Communicator/Send/SendAttachments/SendAttachments';
import SendButton from '../../../components/Communicator/Send/SendButton/SendButton';
import SendOptionsToggler from '../../../components/Communicator/Send/SendOptionsToggler/SendOptionsToggler';
import SendOptions from '../../../components/Communicator/Send/SendOptions/SendOptions';
import AddCodeSnippet from './AddCodeSnippet/AddCodeSnippet';
import Modal from '../../../components/UI/Modal/Modal';
const linkify = require('linkify-it')();

/// Get the text entered by user and convert it to message parts.
function textToMessageParts(text) {
    let parts = [];
    
    const urls = linkify.match(text);
    const urlParts = [];
    if (urls) {
        for (let i = 0; i < urls.length; i++) {

            const startIndex = urls[i-1] ? urls[i-1].lastIndex : 0;

            parts.push({ // get text before current url
                startIndex: startIndex,
                type: 'unformated',
                content: text.substring(startIndex, urls[i].index)
            });

            parts.push({
                startIndex: urls[i].index,
                type: 'url',
                content: urls[i].raw,
                url: urls[i].url
            });

            if (!urls[i+1]) { // get text placed after last url
                parts.push({
                    startIndex: urls[i].lastIndex,
                    type: 'unformated',
                    content: text.substring(urls[i].lastIndex)
                });
            }
        }
    }
    else {
        // Whole text as a message part
        parts.push({
            startIndex: 0,
            type: 'text',
            content: text
        });
    }


    parts = parts.map(x => ({...x, type: x.type === 'unformated' ? "text" : x.type}));

    // todo - remove startIndex

    parts.sort((a , b) => a.startIndex < b.startIndex);

    return parts.concat(urlParts);
}

/// Component responsible for preparing new message.
const Send = props => {

    const [currentText, setCurrentText] = useState("/// Component responsible for preparing new message. ");
    const [isInputHighlighted, setIsInputHighlighted] = useState(false);
    const [areSenOptionsExpanded, setAreSenOptionsExpanded] = useState(false);
    const [snippets, setSnippets] = useState([]);
    const [showAddSnippet, setShowAddSnippet] = useState(true);

    const textChangeHandler = (ev) => {
        setCurrentText(ev.target.value);
    };

    const textFieldKeydownHandler = (ev) => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault();
            if (ev.target.value !== "") {
                formSubmitHandler(ev);
            }
        }
        // todo on Tab press open sendOptions and navigate to first of them
    };

    const formSubmitHandler = ev => {
        ev.preventDefault();

        const msgParts = textToMessageParts(currentText);

        // convert code snippets into message parts
        const snippetsParts = snippets.map(x => ({
            type: 'code',
            content: x.code,
            language: x.language,
            fileName: x.fileName
        }))

        msgParts.push(...snippetsParts);

        // msgParts.push(filesParts);

        // clear textarea.
        // setCurrentText("");

        const msg = {
            id: ("myId"+ uuid()) + uuid(),
            authorId: "myId" + Date.now()%2,
            time: new Date().toUTCString(),
            parts: msgParts
        };
        
        props.addMessage(msg);
    };

    const textFieldFocusHandler = (ev) => {
        setIsInputHighlighted(true);
        setAreSenOptionsExpanded(false);
    };

    const textFieldBlurHandler = ev => {
        setIsInputHighlighted(false);
    };

    const toggleSendOptionsHandler = (ev) => {
        setAreSenOptionsExpanded(currentState => !currentState);
    };

    const sendOptionClickHandler = (option) => {
        switch (option) {
            case "code":
                setShowAddSnippet(true);
                break;
        
            default:
                console.warn("Unrecognized 'send-option' selected");
                break;
        }
    }

    const addSnippetExitHandler = (snippet) => {
        if (snippet) {
            setSnippets(prevState => [...prevState, snippet]);
        }
        setShowAddSnippet(false);
    };

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
                        optionClicked={sendOptionClickHandler}
                    />
                </div>
                <SendOptionsToggler
                    expanded={areSenOptionsExpanded}
                    clicked={toggleSendOptionsHandler}
                />
                <SendButton />
            </form>

            <Modal show={showAddSnippet} modalClosed={addSnippetExitHandler}>
                <AddCodeSnippet 
                    supportedLanguages={SyntaxHighlighter.supportedLanguages} 
                    onExit={addSnippetExitHandler}    
                />
            </Modal>
        </div>
    );
};

export default Send;