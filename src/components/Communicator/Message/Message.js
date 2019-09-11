import React from 'react';
import classes from './Message.module.css';
import uuid from 'uuid/v1';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const open = window.require( 'open' );

function prepareMsgFile(file, key) {
    // todo prepare different returns based on file type.
    return <div key={key} className={classes.fileThumb}><img src={file} alt=""/></div>;
}

const Message = (props) => {
    
    const { msg } = props;
    const author = {
        id: msg.authorId,
        nick: 'Nick_'+uuid().substr(0,5),
        profileUrl: "www.google.pl"
    }
    
    const nickClickHandler = ev => {
        ev.preventDefault();
        if (author.profileUrl)
        open(author.profileUrl);
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
                        <p>{part.fileName}</p>
                        <SyntaxHighlighter 
                            style={ocean}
                            // language={part.language}
                            showLineNumbers 
                            // wrapLines
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
        <div className={classes.Message}>
            <div className={[classes.MessageContainer, author.id === /*todo myId from store*/"myId" ? classes.My : classes.Your].join(" ")}>
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
