import React from 'react';
import classes from './Row.module.css';

const row = props => {
    const img = require('../../../assets/images/logo192.png');
    const styles = [classes.Row];
    if (props.active) 
        styles.push(classes.Active)

    const diodeStyles = [classes.StatusDiode];
    switch (props.status) { // TODO - mb do it base last active time
        case "active":
            diodeStyles.push(classes.Green);
            break;
        case "afk":
            diodeStyles.push(classes.Orange);
            break;
        case "long-afk":
            diodeStyles.push(classes.Red);
            break;
        default:
            break;
    }

    const closeButtonStyles = [classes.CloseButton];
    if (props.showCloseBtn && props.isOpened) {
        closeButtonStyles.push(classes.Show);
    } 

    return (
        <div className={styles.join(" ")}>
            <div className={classes.Avatar}><img src={img} alt={props.alt ? props.alt : ""} /></div>
            <div className={classes.Text}>
                {props.text}
            </div>
            <button className={closeButtonStyles.join(" ")}>x</button>
            <div className={diodeStyles.join(" ")}></div>
        </div>
    );
};


export default row;