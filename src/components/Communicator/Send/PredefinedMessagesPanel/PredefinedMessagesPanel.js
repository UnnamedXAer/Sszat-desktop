import React, { useEffect, useRef } from 'react';
import classes from './PredefinedMessagesPanel.module.css';
import PredefinedMessage from '../../PredefinedMessage/PredefinedMessage';
import PREDEFINED_MESSAGES from '../../../../utils/predefinedMessages';

const PredefinedMessagesPanel = (props) => {

    const predefinedMessagesPanelRef = useRef();
    let timeout = null;

    useEffect(() => {
        if (predefinedMessagesPanelRef.current.firstChild)
            predefinedMessagesPanelRef.current.firstChild.focus();
        else {
            predefinedMessagesPanelRef.current.focus();
        }
    }, []);

    const focusHandler = ev => {
        clearTimeout(timeout);
    }

    const blurHandler = ev => {
        // timeout = setTimeout(props.close, 100);
    }

    const keyDownHandler = ev => {
        if (ev.keyCode === 27) {
            props.close();
        }
    }

    const optionNames = Object.keys(PREDEFINED_MESSAGES);

    const options = optionNames.map((predefinedMessageKey, index) => {
        const predefinedMessage = PREDEFINED_MESSAGES[predefinedMessageKey];
        return <PredefinedMessage 
            key={index} 
            tabIndex={100+index} 
            iconName={predefinedMessage.iconName} 
            labelText={predefinedMessage.label} 
            labelPosition={predefinedMessage.labelPosition}
            title={predefinedMessage.title}
            clicked={() => props.predefinedMessageClicked(predefinedMessageKey)} 
        />
    });

    return (
        <div className={classes.PredefinedMessagesPanel} 
            tabIndex="99" 
            onFocus={focusHandler} 
            onBlur={blurHandler} 
            ref={predefinedMessagesPanelRef} 
            onKeyDown={keyDownHandler}
        >
            {
                options
            }
        </div>
    );
};

export default PredefinedMessagesPanel;