import React from 'react';
import classes from './Checkbox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const checkbox = (props) => {
    return (
        <label>
            <div className={classes.Placeholder}>
                <input 
                    className={classes.RealCheckbox}
                    type="checkbox" 
                    onChange={props.readOnly ? () => false : props.onChange} 
                    checked={props.checked} 
                    // readOnly={props.readOnly}
                    disabled={props.disabled}
                 />
                <span className={"fa-layers fa-fw "+ classes.Checkbox} >
                <FontAwesomeIcon icon="square" className={classes.Square} transform="grow-12"/>
                {props.checked && <FontAwesomeIcon icon="check" color="white" transform="grow-10 up-2 right-3"/>}
                    </span>
                {props.label}
            </div>
        </label>
    );
};

export default checkbox;