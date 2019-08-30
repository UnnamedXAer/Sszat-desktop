import React from 'react';
import classes from './SendOptionsToggler.module.css';

const sendOptionsToggler = (props) => {

    return (
        <div 
            className={[classes.SendOptionsToggler, props.expanded ? classes.Opened : classes.Closed].join(" ")} 
            tabIndex="2"
            onClick={props.clicked} >
            <div className={classes.Arrow}></div>
        </div>
    );
}

export default sendOptionsToggler;