import React from 'react';
import classes from './SendOption.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SendOption = ({iconName, clicked}) => {
    const styles = [classes.SendOption];
    const clickHandler = ev => {
        ev.preventDefault();
        clicked();
    }

    return (
        <button 
            onClick={clickHandler} 
            className={styles.join(" ")} 
        >
            <FontAwesomeIcon icon={iconName} />
        </button>
    );
};

export default SendOption;