import React from 'react';
import classes from './SignVendors.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GitHubLogin from 'github-login';


const signVendors = ({
	githubSuccess,
	githubFail
}) => {
	return (
		<div className={classes.SignVendors}>
			<button className={classes.Google}>
				<FontAwesomeIcon icon={["fab", "google"]} />
			</button>
			<button className={classes.Facebook}>
				<FontAwesomeIcon icon={["fab", "facebook"]} />
			</button>
			<GitHubLogin 
				className={classes.Github}
				clientId="ac56fad434a3a3c1561e"
				onSuccess={githubSuccess}
				onFailure={githubFail} >
					<FontAwesomeIcon icon={["fab", "github"]} />
			</GitHubLogin>

			{/* <button className={classes.Github}>
				<FontAwesomeIcon icon={["fab", "github"]} />
			</button> */}
		</div>
	)
}

export default signVendors;
