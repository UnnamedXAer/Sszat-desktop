import React from 'react';
import classes from './SignVendors.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GitHubLogin from 'github-login';


const signVendors = ({
	githubRequest,
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
				clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
				redirectUri="http://localhost:3330/v1/auth/github/callback"
				onSuccess={githubSuccess}
				onFailure={githubFail} 
				onRequest={githubRequest}>
					<FontAwesomeIcon icon={["fab", "github"]} />
			</GitHubLogin>

			{/* <button className={classes.Github}>
				<FontAwesomeIcon icon={["fab", "github"]} />
			</button> */}
		</div>
	)
}

export default signVendors;
