import React from 'react';
import classes from './TextField.module.css';

const textField = ({
    highlighted,
    textChanged,
    keyDown,
    currentText,
    focused,
    blurred
}) => {

    const styles = [classes.TextField];
    if (highlighted) {
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
                onChange={textChanged}
                onKeyDown={keyDown}
                value={currentText}
                onFocus={focused}
                onBlur={blurred}
            />
        </div>
    );
}

export default textField;