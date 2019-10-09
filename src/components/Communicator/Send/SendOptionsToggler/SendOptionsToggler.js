import React from 'react';
import classes from './SendOptionsToggler.module.css';

const sendOptionsToggler = ({ expanded, clicked }) => {

    const clickHandler = ev => {
        ev.preventDefault();
        clicked();
    }

    return (
        <button 
            className={[classes.SendOptionsToggler, expanded ? classes.Opened : classes.Closed].join(" ")} 
            tabIndex="2"
            onClick={clickHandler} >
            <div className={classes.Arrow}></div>
        </button>
    );
}

export default sendOptionsToggler;