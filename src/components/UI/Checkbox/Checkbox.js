import React from 'react';
import classes from './Checkbox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const checkbox = ({
    checked,
    onChange,
    disabled,
    label,
    readOnly,
    name,
    title
}) => {

    const color = getComputedStyle(document.documentElement).getPropertyValue('--color-font-input').trim();

    return (
        <label title={title}>
            <div className={classes.Placeholder}>
                <input 
                    className={classes.RealCheckbox}
                    type="checkbox" 
                    onChange={readOnly ? () => false : onChange} 
                    checked={checked} 
                    disabled={disabled}
                    name={name}
                 />
                <span className={["fa-layers fa-fw", classes.Checkbox].join(" ")} >
                <FontAwesomeIcon icon="square" className={classes.Square} transform="grow-10"/>
                    {checked && <FontAwesomeIcon icon="check" color={color} transform="grow-10 up-2 right-3"/>}
                    </span>
                {label}
            </div>
        </label>
    );
};

export default checkbox;