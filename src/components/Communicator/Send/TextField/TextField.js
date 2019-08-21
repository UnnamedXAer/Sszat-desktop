import React from 'react';
import classes from './TextField.module.css';

const textField = props => {
    return (
        <div className={classes.TextField}>
            <textarea
                // cols="50"
                rows="3"
                onChange={props.textChanged}
                value={props.currentText}
            />
        </div>
    );
}

export default textField;