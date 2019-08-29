import React from 'react';
import classes from './SendOptions.module.css';

const sendOptions = (props) => {
    return (
        <div className={classes.SendOptions}
            tabIndex="2"
            onFocus={(ev) => props.toggleHighlight(ev, true)}
            onBlur={(ev) => props.toggleHighlight(ev, false)}
        >
            III
        </div>
    );
}

export default sendOptions;