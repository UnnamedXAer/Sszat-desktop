import React, { useEffect, useRef } from 'react';
import useComponentClickOutside from '../../../../hooks/useComponentClickOutside';
import classes from './PredefinedMessagesPanel.module.css';
import PredefinedMessage from '../../PredefinedMessage/PredefinedMessage';
import SendPanelKeyDown from '../../../../utils/SendPanelKeyDown';
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


    const optionKeys = [];
    const options = PREDEFINED_MESSAGES.map((predefinedMessage, index) => {

        optionKeys.push(predefinedMessage.key)

        return <PredefinedMessage 
            key={index}
            index={index+1}
            tabIndex={100+index} 
            iconName={predefinedMessage.iconName} 
            labelText={predefinedMessage.label} 
            labelPosition={predefinedMessage.labelPosition}
            title={predefinedMessage.title}
            clicked={() => props.selectPredefinedMessage(predefinedMessage.key)} 
        />
    });
    
    const keyDownController = new SendPanelKeyDown(props.selectPredefinedMessage, props.close, optionKeys);

    return (
        <div className={classes.PredefinedMessagesPanel} 
            tabIndex="99" 
            ref={predefinedMessagesPanelRef} 
            onKeyDown={keyDownController.handler}
        >
            {options}
        </div>
    );
};

export default PredefinedMessagesPanel;