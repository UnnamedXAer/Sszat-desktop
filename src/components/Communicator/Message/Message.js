import React from 'react';
import classes from './Message.module.css';


function prepareMsgFile(file) {
    // todo prepare different returns based on file type.
    return <div className={classes.fileThumb}><img src={file} alt=""/></div>;
}

const Message = (props) => {

    const { msg } = props;
    const { author } = msg;

    let contentText = [];
    let contentFiles = [];
    console.log(msg.parts);
    for(let i = 0; i < msg.parts.length; i++) {
        const part = msg.parts[i];
        switch (part.type) {
            case 'new-line': 
                contentText.push(<p className={classes.NewLine}></p>);
                break;
            case 'text':
                contentText.push(<span className={classes.Sentence}>{part.content}</span>);
                break;
            case 'file':
                contentFiles.push(prepareMsgFile(part.content));
                break;
            case 'code': // todo mb import some package to style code
                contentText.push(<div className={classes.Code}>{part.content}</div>);
                break;
            default:
                contentText.push(<p className={classes.WrongTypeInfo}>(Part of message is not displayed because of unrecognized type.)</p>)
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
                    <div className={classes.Text}>
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
