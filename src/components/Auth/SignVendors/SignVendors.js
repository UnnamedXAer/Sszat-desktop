import React from 'react';
import classes from './SignVendors.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const signVendors = () => {
	return (
		<div className={classes.SignVendors}>
			<button className={classes.Google}>
				<FontAwesomeIcon icon={["fab", "google"]} />
			</button>
			<button className={classes.Facebook}>
				<FontAwesomeIcon icon={["fab", "facebook"]} />
			</button>
			<button className={classes.Github}>
				<FontAwesomeIcon icon={["fab", "github"]} />
			</button>
		</div>
	)
}

export default signVendors;
