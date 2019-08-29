import React from 'react';
import classes from './TextField.module.css';

const textField = props => {
    return (
        <div className={classes.TextField}>
            <textarea
                lang="pl-PL"
                tabIndex="1"
                autoComplete="off" 
                spellCheck="true"
                rows="2"
                onChange={props.textChanged}
                onKeyDown={props.keyDown}
                value={props.currentText}
                onFocus={(ev) => props.toggleHighlight(ev, true)}
                onBlur={(ev) => props.toggleHighlight(ev, false)}
            />
        </div>
    );
}

export default textField;