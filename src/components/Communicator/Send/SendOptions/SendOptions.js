import React from 'react';
import classes from './SendOptions.module.css';
import SendOption from './SendOption/SendOption';

const sendOptions = ({ expanded, optionClicked }) => {
    const styles = [classes.SendOptions];
    styles.push((expanded) ? classes.Expanded : classes.Collapsed);

    return (
        <div className={styles.join(" ")} >
            <SendOption tabIndex="3" clicked={() => optionClicked("code")} iconName="bug" />
            <SendOption tabIndex="4" clicked={() => optionClicked("read-file")} iconName="paperclip" />
            <SendOption tabIndex="5" clicked={() => optionClicked("emoticons")} iconName="grin" />
            <SendOption tabIndex="6" clicked={() => optionClicked("predefined")} iconName="umbrella-beach" />
        </div>
    );
};

export default sendOptions;