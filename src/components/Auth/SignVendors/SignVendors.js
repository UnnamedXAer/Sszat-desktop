import React from 'react';
import classes from './SignVendors.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import axiosInstance from '../../../axios/axios';
const { ipcRenderer } = window.require("electron");

const signVendors = ({ signInUserSuccess }) => {

	const signIn3rdPartHandler = async (ev, response) => {
		try {
			const { data } = await axiosInstance.get("/auth/loggedUser");
			if (data) {
				signInUserSuccess(data);
			}
		}
		catch (err) {
			console.log("signIn3rdPartHandler err: ", err);
		}
		ipcRenderer.removeListener("signIn3rdPart", signIn3rdPartHandler);
	}

	const gitHubSignInClickHandler = async (provider) => {
		ipcRenderer.on("signIn3rdPart", signIn3rdPartHandler);
		ipcRenderer.send("signIn3rdPart", {
			provider
		});
	};

	return (
		<div className={classes.SignVendors}>
			<button className={classes.Google}>
				<FontAwesomeIcon icon={["fab", "google"]} />
			</button>
			<button className={classes.Facebook}>
				<FontAwesomeIcon icon={["fab", "facebook"]} />
			</button>
			<button className={classes.Github} onClick={() => gitHubSignInClickHandler("github")}>
				<FontAwesomeIcon icon={["fab", "github"]} />
			</button>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		signInUserSuccess: (user) => dispatch(actions.signInUserSuccess(user))
	}
}


export default connect(null, mapDispatchToProps)(signVendors);
