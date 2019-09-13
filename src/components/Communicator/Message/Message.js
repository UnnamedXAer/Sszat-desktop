import React, { useEffect, useRef, useState } from 'react';
import classes from './Message.module.css';
import uuid from 'uuid/v1';
import { Light  as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight as SyntaxHighlighterTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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

function prepareMsgFile(file, key) {
    // todo prepare different returns based on file type.
    return <div key={key} className={classes.fileThumb}><img src={file} alt=""/></div>;
}

const Message = ({ msg }) => {
    
    //todo mb useReducer
    const [author] = useState(() => {

        const user = usersList_TEMP.find(x => x.id === msg.authorId)

        return user
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
    let contentFiles = [];
    for(let i = 0; i < msg.parts.length; i++) {
        const part = msg.parts[i];
        switch (part.type) {
            case 'new-line': 
                contentText.push(<br key={i} />/*<p key={i} className={classes.NewLine}></p>*/);
                break;
            case 'text':
                contentText.push(<span key={i} className={classes.Sentence}>{part.content}</span>);
                break;
            case 'file':
                contentFiles.push(prepareMsgFile(part.content, i));
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
