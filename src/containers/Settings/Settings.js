import React from 'react';
import classes from './Settings.module.css';

const settings = props => {
    const styles = [classes.Settings];  
    if (props.opened === true) {
        styles.push(classes.asideMoveLeft);
    }
    
    return (
        <div className={styles.join(" ")}>
            <div></div>
        </div>
    )
}

export default settings;