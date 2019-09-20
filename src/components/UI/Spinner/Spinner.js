import React from 'react';
import classes from './Spinner.module.css';


const spinner = (width, height) => {

    const style = {
        width,
        height
    };

    return (
        <div className={classes.Spinner} style={style}>
            
        </div>
    )
}

export default spinner;
