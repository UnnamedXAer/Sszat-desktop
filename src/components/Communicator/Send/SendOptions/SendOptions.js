import React from 'react';
import classes from './SendOptions.module.css';
import SendOption from './SendOption/SendOption';

const sendOptions = props => {
    const styles = [classes.SendOptions];
    styles.push((props.expanded) ? classes.Expanded : classes.Collapsed);

    return (
        <div className={styles.join(" ")}>
            <SendOption clicked={props.sendOptionClicked} />
            <SendOption clicked={props.sendOptionClicked} />
            <SendOption clicked={props.sendOptionClicked} />
            <SendOption clicked={props.sendOptionClicked} />
        </div>
    );
};

export default sendOptions;