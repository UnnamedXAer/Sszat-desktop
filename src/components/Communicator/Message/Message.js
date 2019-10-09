import React, { useEffect, useRef, useState } from 'react';
import classes from './Message.module.css';
import uuid from 'uuid/v1';
import { Light  as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight as SyntaxHighlighterTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MessageAttachment from './MessageAttachment/MessageAttachment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PREDEFINED_MESSAGES from '../../../utils/predefinedMessages';
const open = window.require( 'open' );

const usersList_TEMP = [
    {
        id: "myId1",
        nick: 'DumbUser_'+uuid().substr(0,5),
        profileUrl: ''
    },
    {
        id: "myId0",
        nick: 'dumbBot_'+uuid().substr(0,5),
        profileUrl: 'www.google.pl'
    }
];

function prepareFilesPreview(files, clickHandler) {
    if (!files || files.length === 0) {
        return [];
    }
    const isSingleFile = files.length === 1;
    return files.map(file => {
        return <MessageAttachment key={file.id} file={file} isSingleFile={isSingleFile} clicked={clickHandler} />;
    });
}

const Message = ({ msg, attachmentClicked }) => {
    
    //todo mb useReducer
    const [author] = useState(() => {

        const user = usersList_TEMP.find(x => x.id === msg.authorId)

        return user;
    });
    const messageRef = useRef();

    useEffect(() => {

        const parenNodeClientHeight = messageRef.current.parentNode.clientHeight;
        const parentNodeScrollTop = messageRef.current.parentNode.scrollTop;
        const parentNodeScrollHeight = messageRef.current.parentNode.scrollHeight;

        // if there is too many messages and scroll will take long time pre-scroll it. 
        if (parentNodeScrollHeight - parentNodeScrollTop > 10 * parenNodeClientHeight) {
            messageRef.current.parentNode.scrollTop = parentNodeScrollHeight - 5 * parenNodeClientHeight;
        }
        messageRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }, [messageRef, msg]);
    
    const nickClickHandler = ev => {
        ev.preventDefault();

        const profileUrl = usersList_TEMP.find(x => x.id === msg.authorId);
        if (profileUrl) {
            open(profileUrl);
        }
    };
    
    const urlClickHandler = (ev, url) => {
        ev.preventDefault();
        open(url);
    };

    let contentText = [];
    for(let i = 0; i < msg.parts.length; i++) {
        const part = msg.parts[i];
        switch (part.type) {
            case 'new-line': 
                contentText.push(<br key={i} />/*<p key={i} className={classes.NewLine}></p>*/);
                break;
            case 'text':
                contentText.push(<span key={i} className={classes.Sentence}>{part.content}</span>);
                break;
            case 'emoticon':
                contentText.push(<FontAwesomeIcon key={i} className={classes.FontAwesome} icon={part.iconName} />);
                break;
            case 'url':
                contentText.push(<span key={i} className={classes.Sentence}><a key={i} className={classes.Url} href="_blank" onClick={(ev) => urlClickHandler(ev, part.url)}>{part.content}</a></span>);
                break;
            case 'code':
                contentText.push(
                    <div key={i} className={classes.Code}>
                        <code className={classes.FileName}>{part.fileName} [{part.language}]</code>
                        <SyntaxHighlighter 
                            style={SyntaxHighlighterTheme}
                            language={part.language}
                            showLineNumbers 
                            wrapLines
                        >
                            {part.content}
                        </SyntaxHighlighter>
                    </div>
                );
                break;
            default:
                contentText.push(<p key={i} className={classes.WrongTypeInfo}>(Part of message is not displayed because of unrecognized type.)</p>)
                break;
        }
    }

    
    let contentFiles = prepareFilesPreview(msg.files, attachmentClicked);

    let predefinedMessageIcon = null;

    if (msg.predefinedMsgKey) {
        const predefinedMessage = PREDEFINED_MESSAGES[msg.predefinedMsgKey];
        if (typeof predefinedMessage.iconName !== "string") {
            predefinedMessageIcon = <span style={{maxHeight:"70px", width: "100%"}} className="fa-layers fa-fw">
                <FontAwesomeIcon icon={predefinedMessage.iconName[0]} className={classes.FontAwesomeIcon} size='3x' />
                <FontAwesomeIcon 
                    icon={predefinedMessage.iconName[1]} 
                    className={classes.FontAwesomeIcon} 
                    size="2x" 
                    transform="up-2 right-1" />
            </span>
        }
        else {
            predefinedMessageIcon = <FontAwesomeIcon 
                icon={predefinedMessage.iconName} 
                className={classes.FontAwesomeIcon} 
                size="3x"
            />
        }
    }


    return (
        <div className={classes.Message} ref={messageRef}>
            <div className={[classes.MessageContainer, author.id === /*todo myId from store*/"myId1" ? classes.My : classes.Your].join(" ")}>
                <div className={classes.Title}>
                    <a 
                        className={classes.Nick} 
                        onClick={nickClickHandler}
                        href="_blank" 
                    >
                        {author.nick}
                    </a>
                    <p className={classes.Time}>{msg.time}</p>
                </div>
                <div className={classes.Content}>
                    <div className={classes.TextContainer}>
                        {contentText}
                        {predefinedMessageIcon}
                    </div>
                    <div className={classes.Files}>
                        {contentFiles}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
