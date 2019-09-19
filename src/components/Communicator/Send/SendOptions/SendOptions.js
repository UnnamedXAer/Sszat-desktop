import React from 'react';
import classes from './SendOptions.module.css';
import SendOption from './SendOption/SendOption';

const sendOptions = ({ expanded, optionClicked }) => {
    const styles = [classes.SendOptions];
    styles.push((expanded) ? classes.Expanded : classes.Collapsed);

    return (
        <div className={styles.join(" ")} >
            <SendOption clicked={() => optionClicked("code")} iconName="code.svg" />
            <SendOption clicked={() => optionClicked("read-file")} iconName="attachment.svg" />
            <SendOption clicked={() => optionClicked("")} iconName="emoticon.svg" />
            <SendOption clicked={() => optionClicked("")} iconName="none.svg" />
        </div>
    );
};

export default sendOptions;