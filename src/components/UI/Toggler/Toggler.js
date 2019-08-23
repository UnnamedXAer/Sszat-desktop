import React from 'react';
import classes from './Toggler.module.css';

const toggler = props => {

    return (
        <div 
            className={[classes.Toggler, (props.opened ? classes.Opened : classes.Closed)].join(" ")}
            onClick={props.clicked} >
            <div className={classes.Arrow}></div>
            <div className={classes.Arrow}></div>
        </div>
    );
};

export default toggler;