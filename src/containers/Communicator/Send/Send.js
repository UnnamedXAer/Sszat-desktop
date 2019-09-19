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
const { dialog, clipboard } = window.require('electron').remote;
const { readFile } = window.require('fs');
var slash = window.require('slash');
var { extname, basename } = require('path');

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

/// Component responsible for preparing new messages.
const Send = props => {

    const [currentText, setCurrentText] = useState(`/// Comp www.google.net onent responsible.
rt https://electronjs.org/docs/tutorial/security. he https://electronjs.org/docs/tutorial/security. he https://electronjs.org/docs/tutorial/security
hrherthe`);
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
            console.log(err);
        }
        
        if (selectedFilesPath) {
            readAddedFiles(selectedFilesPath);
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
                //todo recodnize platform  => (not woking) process.platform === 'win32'
                name: basename((true) ? slash(x.path) : x.path),
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
        setFiles(prevState => prevState.filter(x => x.path !== path))
    }

    const dragOverHandler = ev => {
        ev.preventDefault();
        // copy does not work
        ev.dataTransfer.dropEffect = "copy";
    }

    const dropHandler = ev => {
        if (ev.clipboardData) { 
            // todo remove
            alert("Drop with clipboardData!!!!!");
        }
        ev.preventDefault();

        const dataTransfer = ev.dataTransfer;
        const droppedFiles = dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            readAddedFiles([...droppedFiles].map(x => x.path));
        }
    }

    /*todo - use useCallback here or use promise to return value and move outside the component */
    const readAddedFiles = (filesPath) => {
        const newFiles = [];
        for (let i = 0; i < filesPath.length; i++) {
            // check if file is not already added
            const filePath = (filesPath[i]);
            if (files.findIndex(existingFile => existingFile.path === filePath) >= 0) {
                console.log('File already added', filePath);
                continue;
            }
            newFiles.push({
                path: filePath,
                ext: extname(filePath),
                data: null
            });
        }

        // TODO - move to separate function
        if (newFiles.length === 0) {
            // nothing to do
            return;
        }
        setFiles(prevState => prevState.concat(newFiles));
        newFiles.forEach(newFile => {
            readFile(newFile.path, (err, data) => {
                if (err) {
                    return console.log(err);
                }
                setFiles(prevState => {
                    const index = prevState.findIndex(x => x.path === newFile.path);
                    const updatedState = [...prevState];
                    updatedState[index] = {
                        ...prevState[index],
                        data: data
                    }
                    return updatedState;
                });
            }); 
        });
    };

    const pasteHandler = ev => {
        // console.log(clipboard);
        var content = null;
        try { 
            content = clipboard.readText(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('text', content);
        try { 
            content = clipboard.readHTML(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('html', content);
        try { 
            content = clipboard.readRTF(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('rtf', content);
        try { 
            content = clipboard.readImage(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('Image', content);
        try { 
            content = clipboard.readBuffer(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('Buffer', content);
        try { 
            content = clipboard.readBookmark(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('Bookmark', content);
        try { 
            content = clipboard.readFindText(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('FindText', content);

        try { 
            content = clipboard.readBuffer('FileName'); } 
        catch (err) { 
            content = err.toString() 
        }
        console.log("fileName:  ", content);
        try { 
            content = clipboard.readBuffer('FileName').toString(); } 
        catch (err) { 
            content = err.toString() 
        }
        console.log("fileName.ToString:  ", content);

        // https://stackoverflow.com/questions/14573001/nodejs-how-to-decode-base64-encoded-string-back-to-binary
        console.log('Paste handler');
    }

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