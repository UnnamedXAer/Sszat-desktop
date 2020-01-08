import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = ({ show, clicked, children, backdropRef }) => (
	show ? <div 
		className={classes.Backdrop} 
		ref={backdropRef}
		onClick={clicked}>
			{children}
		</div> : null
);

export default backdrop;