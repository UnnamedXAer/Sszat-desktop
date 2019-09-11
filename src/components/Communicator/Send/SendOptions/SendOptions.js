import React from 'react';
import classes from './SendOptions.module.css';
import SendOption from './SendOption/SendOption';

const sendOptions = props => {
    const styles = [classes.SendOptions];
    styles.push((props.expanded) ? classes.Expanded : classes.Collapsed);

    return (
        <div className={styles.join(" ")}>
            <SendOption clicked={() => props.optionClicked("code")} >{"< />"}</SendOption>
            <SendOption clicked={() => props.optionClicked("")} ></SendOption>
            <SendOption clicked={() => props.optionClicked("")} ></SendOption>
            <SendOption clicked={() => props.optionClicked("")} >Tim33123</SendOption>
        </div>
    );
};

export default sendOptions;