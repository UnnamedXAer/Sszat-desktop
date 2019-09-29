import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    const {
        value,
        required,
        disabled,
        readOnly,
        onChange,
        onBlur,
        onFocus,
        placeholder,
        name,
        type,

        validationError
    } = props;
    
    const styles = [classes.Input];
    if (validationError) {
        styles.push(classes.Error);
    }

    return (
        <input className={styles.join(" ")} 
            value={value}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            name={name}
            type={type}
         />
    );
};

export default input;
