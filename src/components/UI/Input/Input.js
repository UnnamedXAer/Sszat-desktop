import React from 'react';
import classes from './Input.module.css';

const input = ({
        inputRef,
        tabIndex,
        styles,
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
    }) => {
    
    const inputStyles = [classes.Input];
    if (error) {
        inputStyles.push(classes.InputError);
    }

    if (disabled) {
        inputStyles.push(classes.Disabled);
    }

    return (
        <span>
            <input className={inputStyles.join(" ")} 
                // style={{...styles}}
                ref={inputRef}
                tabIndex={tabIndex}
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
         </span>
    );
};

export default input;
