import React from 'react';
import classes from './Message.module.css';


function prepareMsgFile(file, key) {
    // todo prepare different returns based on file type.
    return <div key={key} className={classes.fileThumb}><img src={file} alt=""/></div>;
}

const Message = (props) => {

    const { msg } = props;
    const { author } = msg;

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
            case 'code': // todo mb import some package to style code
                contentText.push(<div key={i} className={classes.Code}>{part.content}</div>);
                break;
            default:
                contentText.push(<p key={i} className={classes.WrongTypeInfo}>(Part of message is not displayed because of unrecognized type.)</p>)
                break;
        }
    }

    return (
        <div className={classes.Message}>
            <div className={[classes.MessageContainer, author.id === "myId" ? classes.My : classes.Your].join(" ")}>
                <div className={classes.Title}>
                    <p className={classes.Nick}>{author.nick}</p>
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
