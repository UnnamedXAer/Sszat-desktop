import React from 'react';
import classes from './Emoticon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const emoticon = ({iconName, clicked}) => {
    return (
        <div className={classes.Emoticon} onClick={clicked}>
            <FontAwesomeIcon icon={iconName} className={classes.FontAwesomeIcon} size="lg" />
        </div>
    );
};

export default emoticon;
