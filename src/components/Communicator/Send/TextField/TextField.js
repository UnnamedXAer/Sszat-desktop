import React from 'react';
import classes from './TextField.module.css';

const textField = props => {
    const styles = [classes.TextField];
    if (props.highlighted) {
        styles.push(classes.Highlighted);
    }

    return (
        <div className={styles.join(" ")}>
            <textarea
                lang="pl-PL"
                tabIndex="1"
                autoComplete="off" 
                spellCheck="true"
                rows="2"
                onChange={props.textChanged}
                onKeyDown={props.keyDown}
                value={props.currentText}
                onFocus={props.focused}
                onBlur={props.blurred}
            />
        </div>
    );
}

export default textField;