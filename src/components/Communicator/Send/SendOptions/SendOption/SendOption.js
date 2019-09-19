import React from 'react';
import classes from './SendOption.module.css';

const SendOption = ({iconName, clicked}) => {
    const styles = [classes.SendOption];
    const clickHandler = ev => {
        ev.preventDefault();
        clicked();
    }
    let bgImg= "";
    try {
        // todo - remove todo if all icons exists
        bgImg = require('../../../../../assets/images/SendOptions/'+ iconName);
    }
    catch (err) {

    }

    return (
        <button 
            onClick={clickHandler} 
            className={styles.join(" ")} 
            style={{backgroundImage: `url(${bgImg})`}}
        >
        </button>
    );
};

export default SendOption;