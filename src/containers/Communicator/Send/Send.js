import React, { useState, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'; // todo (supportedLanguages) do it better
import uuid from 'uuid/v1';
import classes from './Send.module.css';
import TextField from '../../../components/Communicator/Send/TextField/TextField';
import SendAttachments from '../../../components/Communicator/Send/SendAttachments/SendAttachments';
import SendButton from '../../../components/Communicator/Send/SendButton/SendButton';
import SendOptionsToggler from '../../../components/Communicator/Send/SendOptionsToggler/SendOptionsToggler';
import SendOptions from '../../../components/Communicator/Send/SendOptions/SendOptions';
import AddCodeSnippet from './AddCodeSnippet/AddCodeSnippet';
import EmoticonsPanel from '../../../components/Communicator/Send/EmoticonsPanel/EmoticonsPanel';
import Modal from '../../../components/UI/Modal/Modal';
import readSingleFile from '../../../utils/readFile';
import { logFileError } from '../../../utils/errors';
import { parseDataTransferText, openFilesDialog } from '../../../utils/attachments';
import TextToPartsConverter from '../../../utils/send';
const slash = window.require('slash');
const { extname, basename } = require('path');

const updateFileData = (prevState, id, data) => {
    const index = prevState.findIndex(x => x.id === id);
    const updatedState = [...prevState];
    updatedState[index] = {
        ...prevState[index],
        data: data
    }
    return updatedState;
}

/// Component responsible for preparing new messages.
const Send = props => {

    const [currentText, setCurrentText] = useState(`With FontAwesome version <grin-tongue/> 5 the www.google.net CSS required for this <smile/>solution has changed. <kiss/> <gArin-hearts/> <flushed/> <grin-tongue/> `);
    const [isInputHighlighted, setIsInputHighlighted] = useState(false);
    const [areSenOptionsExpanded, setAreSenOptionsExpanded] = useState(false);
    const [codeSnippets, setCodeSnippets] = useState([]);
    const [showAddSnippet, setShowAddSnippet] = useState(false);
    const [showEmoticons, setShowEmoticons] = useState(false);
    const [files, setFiles] = useState([]);

    const textFieldRef = useRef();

        /*todo - use useCallback here or mb use promise to return value and move outside the component */
    const readAddedFiles = (incomingFiles) => {
        // if incoming file is string then file was selected via dialog otherwise from dataTransfer.files
        // if incomingFiles is empty then the value does not matter
        const isStringType = typeof incomingFiles[0] === "string";

        for (let i = 0; i < incomingFiles.length; i++) {
            const incomingFile = (incomingFiles[i]);

            const filePath = incomingFile.path || (isStringType ? incomingFile : null);
            console.log('filePath', filePath);
            // if we have path then incoming file is from disk
            // we can skip incoming file from disk if is already added.
            if (filePath && files.findIndex(existingFile => existingFile.path === filePath) >= 0) {
                console.log('File already added', filePath);
                continue;
            }

            const name = isStringType ? basename(slash(filePath)) : incomingFile.name;

            const newFile = ({
                id: uuid(),
                // if "isStringType" then whe do not know data type
                type: !isStringType ? incomingFile.type : null,
                path: filePath,
                //todo - basename may not working on os != windows
                name: name,
                ext: extname(name),
                data: null
            });
            setFiles(prevState => prevState.concat(newFile));

            // promises.push(readSingleFile(isStringType, (isStringType ? filePath : incomingFile), newFile.id));
            readSingleFile(isStringType, (isStringType ? filePath : incomingFile), newFile.id)
                .then(onFileSuccess)
                .catch(onFileFailure);
        }
    };

    function onFileSuccess ([data, id]) {
        setFiles(prevState => updateFileData(prevState, id, data));
    }

    function onFileFailure ([err, id]) {
        logFileError(err);
        setFiles(prevState => prevState.filter(x => x.id !== id));
    }

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
        const textToPartsConverter = new TextToPartsConverter(currentText, codeSnippets);
        textToPartsConverter.convertTextToParts();
        const msgParts = textToPartsConverter.getParts();

        // in case there is need to add more properties.
        const filesParts = files.map(x => {
            return {
                id: x.id,
                name: x.name,
                ext: x.ext,
                data: x.data
            }
        });

        // clear textarea.
        // setCurrentText("");

        // create message object
        const msg = {
            id: ("myId"+ uuid()) + uuid(),
            authorId: "myId" + Date.now()%2,
            time: new Date().toUTCString(),
            parts: msgParts,
            files: filesParts
        };
        
        props.sendMessage(msg);
    };

    const textFieldFocusHandler = (ev) => {
        setIsInputHighlighted(true);
        setAreSenOptionsExpanded(false);
    };

    const textFieldBlurHandler = ev => {
        setIsInputHighlighted(false);
    };

    const toggleSendOptionsHandler = (ev) => {
        setAreSenOptionsExpanded(prevState => !prevState);
    };

    const sendOptionClickHandler = (option) => {
        switch (option) {
            case "code":
                setShowAddSnippet(true);
                break;
            case "read-file":
                const selectedFilesPath = openFilesDialog();
                if (selectedFilesPath) {
                    readAddedFiles(selectedFilesPath);
                } 
                break;
            case "emoticons":
                setShowEmoticons(prevState => !prevState);
                break;
            case "umbrella":
                
                break;
            default:
                console.log("Unrecognized 'send-option' selected.", option);
                break;
        }
    }

    const addSnippetExitHandler = (snippet) => {
        if (snippet) {
            setCodeSnippets(prevState => [...prevState, snippet]);
        }
        setShowAddSnippet(false);
    };

    const deleteAttachmentHandler = id => {
        setFiles(prevState => prevState.filter(x => x.id !== id));
    };

    const emoticonClickHandler = (emoticonName) => {
        setCurrentText(prevText => {
            let newText = prevText;

            if (newText.trim() !== "" && !newText.endsWith(" ")) {
                newText += " ";
            }
            // todo - display real icons instead of <iconName />
            newText += `<${emoticonName}/>`;
            newText += " ";

            return newText;
        });
        setShowEmoticons(false);
        textFieldRef.current.focus();
    }

    const dragOverHandler = ev => {
        ev.preventDefault();
    };

    const dropHandler = ev => {

        if (ev.clipboardData) { 
            // todo remove
            alert("Drop with clipboardData!!!!!");
        }
        ev.preventDefault();

        const dataTransfer = ev.dataTransfer;
        const dataTransferText = dataTransfer.getData('Text');
        
        const dataTransferTextParsed = parseDataTransferText(dataTransfer, dataTransferText);
        if (dataTransferTextParsed.file) {
            setFiles(prevState => prevState.concat(dataTransferTextParsed.file));
        }
        readAddedFiles(dataTransfer.files);
    };

    const pasteHandler = ev => {
        const dataTransfer = ev.clipboardData;
        readAddedFiles(dataTransfer.files);
    };

    return (
        <div className={classes.Send} onPaste={pasteHandler} onDrop={dropHandler} onDragOver={dragOverHandler} >
            {props.draggedOverApp && <div className={classes.DraggedOverAppMask} ><p>Drop here to add.</p></div>}
            <SendAttachments draggedOverApp={props.draggedOverApp} files={files} deleteAttachment={deleteAttachmentHandler} />
            <form onSubmit={formSubmitHandler}>
                <div className={classes.SendInputsContainer} >
                    <TextField
                        fieldRef={textFieldRef}
                        highlighted={isInputHighlighted}
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
            {showEmoticons && <EmoticonsPanel emoticonClicked={emoticonClickHandler} />}
        </div>
    );
};

export default Send;