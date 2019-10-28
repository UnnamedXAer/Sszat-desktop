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
        error,
        validator
    }) => {
    
    let errors = [];
    if (validator) {
        errors = validator.getMessages(name);
    }

    const validatorErrors = <span className={classes.Error}>
        {errors && errors.length > 0 ? (
            <ul>
                {errors.map((err, index) => <li key={index}>{err}</li>)}
            </ul>
        ) : null}
    </span>

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
                style={{...styles}}
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
            <p className={classes.Error}>{validatorErrors}</p>
         </span>
    );
};

export default input;
