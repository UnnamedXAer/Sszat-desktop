import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = ({ show, clicked, children }) => (
    show ? <div className={classes.Backdrop} onClick={clicked}>{children}</div> : null
);

export default backdrop;