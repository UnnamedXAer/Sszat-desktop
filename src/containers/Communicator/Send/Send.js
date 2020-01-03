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
import PredefinedMessagesPanel from '../../../components/Communicator/Send/PredefinedMessagesPanel/PredefinedMessagesPanel';
import Modal from '../../../components/UI/Modal/Modal';
import readSingleFile, { isFileTooBig } from '../../../utils/readFile';
import { logFileError } from '../../../utils/errors';
import { parseDataTransferText, openFilesDialog } from '../../../utils/attachments';
import TextToPartsConverter from '../../../utils/send';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
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

    const [currentText, setCurrentText] = useState("");
    const [isInputHighlighted, setIsInputHighlighted] = useState(false);
    const [areSenOptionsExpanded, setAreSenOptionsExpanded] = useState(false);
    const [codeSnippets, setCodeSnippets] = useState([]);
    const [showAddSnippet, setShowAddSnippet] = useState(false);
    const [showEmoticons, setShowEmoticons] = useState(false);
    const [showPredefinedMessages, setShowPredefinedMessages] = useState(false);
    const [files, setFiles] = useState([]);

    const textFieldRef = useRef();
    const focusTextField = () => {
        textFieldRef.current.focus();
    }

        /*todo - use useCallback here or mb use promise to return value and move outside the component */
    const readAddedFiles = (incomingFiles) => {
        // if incoming file is string then file was selected via dialog otherwise from dataTransfer.files
        // if incomingFiles is empty then the value does not matter
        const isStringType = typeof incomingFiles[0] === "string";

        for (let i = 0; i < incomingFiles.length; i++) {
            const incomingFile = (incomingFiles[i]);

            const filePath = incomingFile.path || (isStringType ? incomingFile : null);
            // if we have path then incoming file is from disk
            // we can skip incoming file from disk if is already added.
            if (filePath && files.findIndex(existingFile => existingFile.path === filePath) >= 0) {
                console.info('File already added', filePath);
                continue;
            }

            const name = isStringType ? basename(slash(filePath)) : incomingFile.name;
            const isFileOversized = isFileTooBig(incomingFile);

            if (isFileOversized) { 
                alert(`Max file size is 25MB.\n${name} exceeds the max size and will not be sent.`);
                // todo - show file in attachments but do not send.
                continue;
            }
            const newFileId = uuid();
            const newFile = ({
                id: newFileId,//uuid(),
                // if "isStringType" then whe do not know data type
                type: !isStringType ? incomingFile.type : null,
                path: filePath,
                //todo - basename may not working on os != windows
                name: name,
                ext: extname(name),
                data: null
            });
            setFiles(prevState => prevState.concat(newFile));

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

		setCurrentText("");
		setFiles([]);
		setCodeSnippets([]);

        const msg = {
            id: null,
            authorId: props.loggedUser.id,
            time: new Date().toUTCString(),
            parts: msgParts,
            files: filesParts,
            predefinedMsgKey: null
        };
        
		props.sendMessage(msg, props.activeRoom);
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
        toggleSelectedSendOption(option);
    };

    const toggleSelectedSendOption = (selectedOption) => {
        switch (selectedOption) {
            case "code":
                setShowAddSnippet(true);
                setShowEmoticons(false);                
                setShowPredefinedMessages(false);
                break;
            case "read-file":
                const selectedFilesPath = openFilesDialog();
                if (selectedFilesPath) {
                    readAddedFiles(selectedFilesPath);
                }
                setShowEmoticons(false);                
                setShowPredefinedMessages(false); 
                break;
            case "emoticons":
                setShowPredefinedMessages(false);
                setShowEmoticons(prevState => !prevState);
                break;
            case "predefined":
                setShowEmoticons(false);                
                setShowPredefinedMessages(prevState => !prevState);                
                break;
            default:
                console.error("Warning!\nUnrecognized 'send-option' selected.", selectedOption);
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

    const selectEmoticonHandler = (emoticonName) => {
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
        focusTextField();
    };

	const selectPredefinedMessageHandler = (predefinedMsgKey) => {
        const msg = {
            id: null,
            authorId: props.loggedUser.id,
            time: new Date().toUTCString(),
            parts: [],
            files: [],
			predefinedMsgKey: predefinedMsgKey
		};
        setShowPredefinedMessages(false);
        props.sendMessage(msg, props.activeRoom);
        focusTextField();
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

	const keyDownHandler = (ev) => {

		if (ev.ctrlKey) {
            let prevStateOfTriggeredOption;
			switch (ev.keyCode) {
				case 76: // l
                    prevStateOfTriggeredOption = showPredefinedMessages;
                    setAreSenOptionsExpanded(true);
                    toggleSelectedSendOption('predefined');
					break;
                case 75: // k
                    prevStateOfTriggeredOption = showEmoticons;
                    setAreSenOptionsExpanded(true);
                    toggleSelectedSendOption('emoticons');
                    break;
                case 70: // f
                    toggleSelectedSendOption("read-file")
                    break;
                case 71: // g
                    toggleSelectedSendOption("code")
                    break;    
				default:
					break;
            }
            
            if (prevStateOfTriggeredOption) {
                focusTextField();
            }
		}
	}

    return (
        <div 
            className={classes.Send} 
            tabIndex="-1"
            onKeyDown={keyDownHandler}
            onPaste={pasteHandler} 
            onDrop={dropHandler} 
            onDragOver={dragOverHandler} >
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
                    openState={showAddSnippet}
                    supportedLanguages={SyntaxHighlighter.supportedLanguages} 
                    onExit={addSnippetExitHandler}    
                />
            </Modal>
            {showEmoticons && <EmoticonsPanel 
                close={() => setShowEmoticons(false)} 
                selectEmoticon={selectEmoticonHandler} 
                />}
            {showPredefinedMessages && <PredefinedMessagesPanel close={() => setShowPredefinedMessages(false)} selectPredefinedMessage={selectPredefinedMessageHandler} />}
        </div>
    );
};

const mapStateToProps = (state) => {
	return {
		loggedUser: state.auth.loggedUser,
		activeRoom: state.rooms.activeRoom
	}
}

const mapDispatchToProps = dispatch => {
	return {
		sendMessage: (message, roomId) => dispatch(actions.sendMessage(message, roomId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Send);