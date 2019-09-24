import React from 'react';
import classes from './SendOptions.module.css';
import SendOption from './SendOption/SendOption';

const sendOptions = ({ expanded, optionClicked }) => {
    const styles = [classes.SendOptions];
    styles.push((expanded) ? classes.Expanded : classes.Collapsed);

    return (
        <div className={styles.join(" ")} >
            <SendOption clicked={() => optionClicked("code")} iconName="bug" />
            <SendOption clicked={() => optionClicked("read-file")} iconName="paperclip" />
            <SendOption clicked={() => optionClicked("emoticons")} iconName="grin" />
            <SendOption clicked={() => optionClicked("predefined")} iconName="umbrella-beach" />
        </div>
    );
};

export default sendOptions;