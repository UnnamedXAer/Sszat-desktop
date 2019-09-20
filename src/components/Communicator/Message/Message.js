import React, { useEffect, useRef, useState } from 'react';
import classes from './Message.module.css';
import uuid from 'uuid/v1';
import { Light  as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight as SyntaxHighlighterTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { imagesExtBase64dataType, getBase64dataType, getFileTypeIcon } from '../../../utils/attachments';
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

function getFilePreview(file, isSingleFile) {
    let img;
    const imgClasses = [isSingleFile ? classes.SingleFileImg : classes.OneOfMany];

    // check if attachment is an image
    if (imagesExtBase64dataType.hasOwnProperty(file.ext)) {
        // if file is image display it
        const base64data = file.data.toString('base64');
        const base64dataType = getBase64dataType(file.ext);
        const imgSrc = `data:${base64dataType};base64,${base64data}`;

        // todo read svg files size
        if (file.ext === ".svg") {
            imgClasses.push(classes.Svg);
        }
        img = 
            <img 
                className={imgClasses.join(" ")} 
                src={imgSrc} 
                alt={file.name}
            />
    }
    else {
        // if file is not an image display icon related to the file type
        let fileIcon = getFileTypeIcon(file.ext);
        let fileTypeIcon;
        try {
            fileTypeIcon = require(`../../../assets/images/fileTypesThumb/svg/${fileIcon}`);
        }
        catch (err) {
            console.log(err);
        }
        img = <img className={imgClasses} src={fileTypeIcon} alt={file.name} />;
    }

    return (
        <div 
            key={file.id} 
            className={classes.fileThumb}
        >
            {img}
        </div>
    );
}

function prepareFilesPreview(files) {
    if (files.length === 0) {
        return [];
    }
    const isSingleFile = files.length === 1;
    return files.map((file, idx) => {
        return getFilePreview(file, isSingleFile);
    });
}

const Message = ({ msg }) => {
    
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

    
    let contentFiles = prepareFilesPreview(msg.files);


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
