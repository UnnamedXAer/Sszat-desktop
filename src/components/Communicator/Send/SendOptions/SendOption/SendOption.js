import React from 'react';
import classes from './SendOption.module.css';

const sendOption = props => {
    const styles = [classes.SendOption];

    const clickHandler = ev => {
        ev.preventDefault();
        props.clicked();
    }

    return (
        <button onClick={clickHandler} className={styles.join(" ")}>{props.children}
        </button>
    );
};

export default sendOption;