import React from 'react';
import classes from './Select.module.css';

const select = ({
    selectRef,
    options,
    defaultValue,
    tabIndex,
    value,
    required,
    disabled,
    readOnly,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    name,
    type
}) => {

    const styles = [classes.Select];

    const optionKeys = Object.keys(options);
    const selectOptions = optionKeys.map(key => <option key={key} value={key}>{options[key]}</option>)

    return (
        <>
            <select className={styles.join(" ")}
                ref={selectRef}
                tabIndex={tabIndex}
                value={value}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                defaultValue={defaultValue}
                name={name}
                type={type}
            >
                {placeholder && <option value="" disabled selected hidden>{placeholder}</option>}
                {selectOptions}
            </select>
        </>
    );
}

export default select;
