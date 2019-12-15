import React from 'react';
import classes from './SignVendors.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
const { ipcRenderer } = window.require("electron");

const signVendors = (fetchLoggedUser) => {

	const gitHubSignInClickHandler = async (provider) => {
		console.log('ipcRenderer', ipcRenderer)
		const signIn3rdPartHandler = (ev, response) => {
			if (response.userId) {
				fetchLoggedUser(response.userId);
			}
			else {
				console.log(response.error)
			}
			ipcRenderer.removeListener("signIn3rdPart", signIn3rdPartHandler);
		};
		console.log("about tot add listener");
		ipcRenderer.addListener("signIn3rdPart", signIn3rdPartHandler);
		console.log("about to send Message to ipcRender");
		ipcRenderer.send("signIn3rdPart", {
			provider
		});
		console.log("after send");
	};

	return (
		<div className={classes.SignVendors}>
			<button className={classes.Google}>
				<FontAwesomeIcon icon={["fab", "google"]} />
			</button>
			<button className={classes.Facebook}>
				<FontAwesomeIcon icon={["fab", "facebook"]} />
			</button>
			{/* <GitHubLogin 
				className={classes.Github}
				clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
				redirectUri="http://localhost:3000"
				onSuccess={githubSuccess}
				onFailure={githubFail} 
				onRequest={githubRequest}>
					<FontAwesomeIcon icon={["fab", "github"]} />
			</GitHubLogin> */}

			<button className={classes.Github} onClick={() => gitHubSignInClickHandler("github")}>
				<FontAwesomeIcon icon={["fab", "github"]} />
			</button>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLoggedUser: (userId) => dispatch(actions.fetchLoggedUser(userId))
	}
}


export default connect(null, mapDispatchToProps)(signVendors);
