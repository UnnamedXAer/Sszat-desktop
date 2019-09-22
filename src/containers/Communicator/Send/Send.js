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
import { getFileExtFromBase64, base64ToBuffer } from '../../../utils/attachments';
import readSingleFile from '../../../utils/readFile';
import { logFileError } from '../../../utils/errors';
const linkify = require('linkify-it')();
const { dialog/*, clipboard*/ } = window.require('electron').remote;
// const { readFile } = window.require('fs');
const slash = window.require('slash');
const { extname, basename } = require('path');


/// Get the text entered by user and convert it to message parts.
function textToMessageParts(text) {
    let parts = [];

    let tmpParts = [];

    // split text on new line characters.
    tmpParts = text.split('\n').map((textLine) => ({
        type: "unformatted",
        content: textLine
    }));

    let len = tmpParts.length;
    // add new-line parts between real lines
    for (let i = 0; i < len; i++) {
        parts.push(tmpParts[i]);
        
        if (i+1 < len) {
            parts.push({
                type: 'new-line'
            });
        }
    }
    
    // check lines for: urls, ...
    tmpParts = [];
    len = parts.length;
    for (let i = 0; i < len; i++) {
        const line = parts[i];

        // skip new lines
        if (line.type === "new-line") {   
            tmpParts.push(line);   
            continue;
        }

        // check for urls in line
        const urls = linkify.match(line.content);
        if (urls) {
            const lineParts = [];
            for (let l = 0; l < urls.length; l++) {

                const startIndex = urls[l-1] ? urls[l-1].lastIndex : 0;

                // setting as 'unformatted' in case the part will need additional checking
                lineParts.push({ // get text before current url
                    // startIndex: startIndex,
                    type: 'unformatted',
                    content: line.content.substring(startIndex, urls[l].index)
                });

                lineParts.push({
                    // startIndex: urls[i].index,
                    type: 'url',
                    content: urls[l].raw,
                    url: urls[l].url
                });

                if (!urls[l+1] && line.content.substring(urls[l].lastIndex) !== "") { // get text placed after last url if not empty
                    lineParts.push({
                        // startIndex: urls[i].lastIndex,
                        type: 'unformatted',
                        content: line.content.substring(urls[l].lastIndex)
                    });
                }
            } // and of urls loop
            
            tmpParts.push(...lineParts);

            // replace line with line parts
            console.log(i,tmpParts);
        }
        else {
            // Whole line as a one message part
            tmpParts.push(line);
        }
    } // end of looping through lines.

    // if all checkings were done chanage unformatted to default = "text"
    parts = tmpParts.map(x => ({...x, type: x.type === 'unformatted' ? "text" : x.type}));

    return parts;
}

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

    const [currentText, setCurrentText] = useState(`/// Comp www.google.net o n ent responsible.
rt https://electronjs.org/docs/tutorial/security. he.`);
    const [isInputHighlighted, setIsInputHighlighted] = useState(false);
    const [areSenOptionsExpanded, setAreSenOptionsExpanded] = useState(false);
    const [snippets, setSnippets] = useState([]);
    const [showAddSnippet, setShowAddSnippet] = useState(false);
    const [files, setFiles] = useState([]);

    function openFilesDialog() {
        let selectedFilesPath;
        try {
            // On Windows and Linux an open dialog can not be both a file selector and a directory selector, 
            // so if you set properties to ['openFile', 'openDirectory'] on these platforms, a directory selector will be shown.
            selectedFilesPath = dialog.showOpenDialogSync({ properties: ['openFile', "openFile", 'multiSelections'] });
        }
        catch (err) {
            alert("ERROR: "+err.message)
            console.log(err);
        }
        
        if (selectedFilesPath) {
            const results = readAddedFiles(selectedFilesPath);
            results.forEach(promise => {
                promise 
                    .then(onFileSuccess)
                    .catch(onFileFailure);
            });
        }   
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

        const msgParts = textToMessageParts(currentText);

        // convert code snippets into message parts
        const snippetsParts = snippets.map(x => ({
            type: 'code',
            content: x.code,
            language: x.language,
            fileName: x.fileName
        }))

        msgParts.push(...snippetsParts);

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

        const msg = {
            id: ("myId"+ uuid()) + uuid(),
            authorId: "myId" + Date.now()%2,
            time: new Date().toUTCString(),
            parts: msgParts,
            files: filesParts
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
            case "read-file":
                openFilesDialog();
                break;
            default:
                console.log("Unrecognized 'send-option' selected.", option);
                break;
        }
    }

    const addSnippetExitHandler = (snippet) => {
        if (snippet) {
            setSnippets(prevState => [...prevState, snippet]);
        }
        setShowAddSnippet(false);
    };

    const deleteAttachmentHandler = path => {
        setFiles(prevState => prevState.filter(x => x.path !== path));
    };

    const dragOverHandler = ev => {
        // console.log("SEND = dragOverHandler")
        ev.preventDefault();
    };

    const dropHandler = ev => {
        // console.log("SEND = dropHandler")

        if (ev.clipboardData) { 
            // todo remove
            alert("Drop with clipboardData!!!!!");
        }
        ev.preventDefault();

        const dataTransfer = ev.dataTransfer;
        const dataTransferText = dataTransfer.getData('Text');
        if (dataTransferText) {
            // check if data is an img
            // eslint-disable-next-line
            if (dataTransferText.match(/data:image\/([a-zA-Z]*);base64,([^\"]*)/)) {

                let fileName;
                let ext;
                const dataTransferHTML = dataTransfer.getData("text/html");
                if (dataTransferHTML) {
                    const altStartIndex = dataTransferHTML.indexOf("alt=\"");
                    const altTextEndIndex = dataTransferHTML.indexOf("\"", altStartIndex+5);
                    fileName = dataTransferHTML.substring(altStartIndex+5, altTextEndIndex);
                    if (fileName && fileName.lastIndexOf(".") !== -1) {
                        ext= extname(fileName);
                    } 
                    else {
                        ext= getFileExtFromBase64(dataTransferText);
                    }
                }
                else {
                    ext= getFileExtFromBase64(dataTransferText);
                    fileName = "file_"+Date.now()+ext;
                }

                const newFile = {
                    id: uuid(),
                    ext: ext,
                    name: fileName,
                    path: null,
                    data: base64ToBuffer(dataTransfer)
                };
                setFiles(prevState => prevState.concat(newFile));
            }
        }

        const droppedFiles = dataTransfer.files;
        const results = readAddedFiles([...droppedFiles]);
        results.forEach(promise => {
            promise 
                .then(onFileSuccess)
                .catch(onFileFailure);
        });
    };

    function onFileSuccess ([data, id]) {
        setFiles(prevState => updateFileData(prevState, id, data));
    }

    function onFileFailure ([err, id]) {
        logFileError(err);
        setFiles(prevState => prevState.filter(x => x.id !== id));
    }

    const pasteHandler = ev => {
        const dataTransfer = ev.clipboardData;
        const results = readAddedFiles(dataTransfer.files);
        results.forEach(promise => {
            promise 
                .then(onFileSuccess)
                .catch(onFileFailure);
        });
    };

    /*todo - use useCallback here or mb use promise to return value and move outside the component */
    const readAddedFiles = (incomingFiles) => {
        // const newFiles = [];
        const promises = [];
        // if incomming file is string then file was selected via dialog otherwise from dataTransef.files
        // if incomingFies.lenght === 0 then the value does not matter
        const isStringType = typeof incomingFiles[0] === "string";

        for (let i = 0; i < incomingFiles.length; i++) {
            // check if file is not already added
            const incomingFile = (incomingFiles[i]);

            //isStringType ? incomingFile : (incomingFile.path ? incomingFile.path : incomingFile.name);
            const filePath = incomingFile.path || (isStringType ? incomingFile : null);
            console.log('filePath', filePath);
            // if we have path then incomming file is from disk
            // we can skip incomming file from disk if is already added.
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

            promises.push(readSingleFile(isStringType, (isStringType ? filePath : incomingFile), newFile.id));
        }
        return promises;
    };

    return (
        <div className={classes.Send} onPaste={pasteHandler} onDrop={dropHandler} onDragOver={dragOverHandler} >
            {props.draggedOverApp && <div className={classes.DraggedOverAppMask} ><p>Drop here to add.</p></div>}
            <SendAttachments draggedOverApp={props.draggedOverApp} files={files} deleteAttachment={deleteAttachmentHandler} />
            <form onSubmit={formSubmitHandler}>
                <div className={classes.SendInputsContainer} >
                    <TextField
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
        </div>
    );
};

export default Send;