import React, { useEffect, useRef } from 'react';
import useComponentClickOutside from '../../../../hooks/useComponentClickOutside';
import classes from './PredefinedMessagesPanel.module.css';
import PredefinedMessage from '../../PredefinedMessage/PredefinedMessage';
import PREDEFINED_MESSAGES from '../../../../utils/predefinedMessages';

const PredefinedMessagesPanel = (props) => {

    const predefinedMessagesPanelRef = useRef();
    useComponentClickOutside(predefinedMessagesPanelRef, props.close);

    useEffect(() => {
        if (predefinedMessagesPanelRef.current.firstChild)
            predefinedMessagesPanelRef.current.firstChild.focus();
        else {
            predefinedMessagesPanelRef.current.focus();
        }
    }, []);

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
            ref={predefinedMessagesPanelRef} 
            onKeyDown={keyDownHandler}
        >
            {options}
        </div>
    );
};

export default PredefinedMessagesPanel;