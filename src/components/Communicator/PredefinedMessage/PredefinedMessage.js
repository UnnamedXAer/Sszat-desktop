import React from 'react';
import classes from './PredefinedMessage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const predefinedMessage = ({iconName, labelText, labelPosition, clicked, tabIndex, title}) => {

    let label = null;
    if (labelText) {
        const labelStyles = [classes.Label];
        switch (labelPosition) {
            case "center":
                labelStyles.push(classes.LabelCenter);
                break;
            case "right":
                labelStyles.push(classes.LabelRight);
                break;
            default:
                break;
        }

        label = <p className={labelStyles.join(" ")}>{labelText}</p>
    }

    let icon = null;

    if (typeof iconName !== "string") {
        icon = <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon={iconName[0]} className={classes.FontAwesomeIcon} size='3x' />
            <FontAwesomeIcon 
                icon={iconName[1]} 
                className={classes.FontAwesomeIcon} 
                size="2x" 
                transform="up-2 right-1" />
        </span>
    }
    else {
        icon = <FontAwesomeIcon 
            icon={iconName} 
            className={classes.FontAwesomeIcon} 
            size="3x"
        />
    }

    return (
        <button 
            className={classes.PredefinedMessage} 
            title={title} 
            tabIndex={tabIndex} 
            onClick={clicked} 
        >
            <div className={classes.PredefinedMessageItemsContainer}>
                {icon}
                {label}
            </div>
        </button>
    );
};

export default predefinedMessage;
