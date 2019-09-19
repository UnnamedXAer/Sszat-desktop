import React from 'react';
import classes from './SendOptionsToggler.module.css';

const sendOptionsToggler = ({ expanded, clicked }) => {

    return (
        <div 
            className={[classes.SendOptionsToggler, expanded ? classes.Opened : classes.Closed].join(" ")} 
            tabIndex="2"
            onClick={clicked} >
            <div className={classes.Arrow}></div>
        </div>
    );
}

export default sendOptionsToggler;