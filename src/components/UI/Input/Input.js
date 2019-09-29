import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    const {
        inputRef,
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
        error
    } = props;
    
    const styles = [classes.Input];
    if (error) {
        styles.push(classes.InputError);
    }

    return (
        <>
        <input className={styles.join(" ")} 
            ref={inputRef}
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
            <p className={classes.Error}>{error}</p>
         </>
    );
};

export default input;
