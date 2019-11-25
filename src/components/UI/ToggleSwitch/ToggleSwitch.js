import React from 'react';
import classes from './ToggleSwitch.module.css';

const toggleSwitch = ({ checked, onChange, disabled, name, tabIndex }) => {

    const styles = [classes.ToggleSwitch];
    styles.push(checked ? classes.ToggleSwitchOn : classes.ToggleSwitchOff);

    if (disabled) {
        styles.push(classes.Disabled);
    }

    const clickHandler = ev => {
        if (!disabled) {
            onChange(ev);
        }
    }

    return <button
        type="button" 
        tabIndex={tabIndex}
        className={styles.join(" ")} 
        name={name} 
        onClick={clickHandler} 
        >

        </button>
};

export default toggleSwitch;