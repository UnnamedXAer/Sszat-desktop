import React, { useEffect, useRef, useState } from 'react';
import classes from './Message.module.css';
import PredefinedMessage from '../PredefinedMessage/PredefinedMessage';
import { Light  as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight as SyntaxHighlighterTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PREDEFINED_MESSAGES from '../../../utils/predefinedMessages';
import MessageAttachments from './MessageAttachments/MessageAttachments';
import { connect } from 'react-redux';
import { toDate } from '../../../utils/date';
const open = window.require( 'open' );

const fakeUser = {
	avatar: "https://www.gstatic.com/devrel-devsite/vbb62cc5a3e8f17e37bae4792b437f28f787df3f9cf9732cbfcc99b4f4ff41a54/firebase/images/lockup.png",
	id: "UNKNOWN-USER-ID",
	joinDate: "Tue, 4 Jan 2000 12:00:00 GMT",
	lastActiveDate: "Tue, 4 Jan 2000 12:00:00 GMT",
	name: "UNKNOWN-USER",
	provider: "UNKNOWN-PROVIDER"
};

const Message = ({ users, loggedUserId, msg }) => {
    const [author] = useState(() => {
        
		let user = users.find(x => x.id === msg.authorId);
		
		user = (user ? user : fakeUser);
		return user;
    });
    const messageRef = useRef();
    
	const isMyMessage = author.id === loggedUserId;

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

        const profileUrl = users.find(x => x.id === msg.authorId);
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
                contentText.push(<br key={i} />);
                break;
            case 'text':
				contentText.push(<span key={i} 
					className={classes.Sentence}>{part.content}</span>);
                break;
            case 'emoticon':
				contentText.push(<FontAwesomeIcon 
					key={i} 
					className={classes.EmoticonFontAwesomeIcon} 
					icon={part.iconName} />);
                break;
            case 'url':
				contentText.push(
					<span 
						key={i} 
						className={classes.Sentence}
					>
						<a key={i} className={classes.Url} 
							href="_blank" 
							onClick={(ev) => urlClickHandler(ev, part.url)}
						>
							{part.content}
						</a>
					</span>
				);
                break;
            case 'code':
                contentText.push(
                    <div key={i} className={classes.Code}>
                        <code className={classes.FileName}>
							{part.fileName} [{part.language}]
						</code>
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
				contentText.push(<p key={i} 
					className={classes.WrongTypeInfo}>
						(Part of message is not displayed because of unrecognized type.)
				</p>);
                break;
        }
    }
    
    let predefinedMessageIcon = null;

    if (msg.predefinedMsgKey) {
        const predefinedMessage = PREDEFINED_MESSAGES.find(x => x.key === msg.predefinedMsgKey);
        predefinedMessageIcon = <PredefinedMessage 
            iconName={predefinedMessage.iconName}
            labelText={predefinedMessage.label}
            labelPosition={predefinedMessage.labelPosition}
            tabIndex="-1"
            title={predefinedMessage.title}
        />
    }

    return (
        <div className={classes.Message} ref={messageRef}>
            <div className={[classes.MessageContainer, isMyMessage ? classes.My : classes.Your].join(" ")}>
                <div className={classes.Title}>
                    <a 
                        className={classes.Nick} 
                        onClick={nickClickHandler}
                        href="_blank" 
                        tabIndex="-1"
                    >
                        {author.userName}
                    </a>
                    <p className={classes.Time}>{toDate(msg.time)}</p>
                </div>
                <div className={classes.Content}>
                    <div className={classes.TextContainer}>
                        {contentText}
                        {predefinedMessageIcon}
                    </div>
                    <MessageAttachments files={msg.files} isMyMessage={isMyMessage} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
	users: state.users.users,
	loggedUserId: state.auth.loggedUser.id
});

export default connect(mapStateToProps)(Message);
