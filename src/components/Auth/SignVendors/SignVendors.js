import React from 'react';
import classes from './SignVendors.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import axiosInstance from '../../../axios/axios';
const { ipcRenderer } = window.require("electron");

const signVendors = ({ fetchLoggedUser }) => {

	const signInBy3rdPartCompleteHandler = async (ev, response) => {
		ipcRenderer.removeListener("signIn3rdPart-completed", signInBy3rdPartCompleteHandler);
		console.log("executed: ", "signIn3rdPart-completed");
		if (response.message) {
			console.log(response.message);
		}
		if (response.userId) {
			fetchLoggedUser(response.userId);
		} 
		else {
			try {
				console.log(`Third party auth popup window was closed without emitting logged user, 
				we will check if user authenticate successfully before.`);
				const { data } = await axiosInstance.get("/auth/loggedUser");
				if (data && data.id) { //TODO do not call api twice
					fetchLoggedUser(data.id);
				}
				else {
					console.log("User was  not authenticated.");
				}
			}
			catch (err) {
				console.log("third part auth complete error: ", err);
			}
		}
	};

	const providerClickHandler = async (provider) => {
		ipcRenderer.on("signIn3rdPart-completed", signInBy3rdPartCompleteHandler);
		ipcRenderer.send("signIn3rdPart", {
			provider
		});
	};

	return (
		<div className={classes.SignVendors}>
			<button className={classes.Google} onClick={() => providerClickHandler("google")}>
				<FontAwesomeIcon icon={["fab", "google"]} />
			</button>
			<button className={classes.Facebook} onClick={() => providerClickHandler("facebook")} >
				<FontAwesomeIcon icon={["fab", "facebook"]} />
			</button>
			<button className={classes.Github} onClick={() => providerClickHandler("github")}>
				<FontAwesomeIcon icon={["fab", "github"]} />
			</button>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLoggedUser: (id) => dispatch(actions.fetchLoggedUser(id))
	};
};


export default connect(null, mapDispatchToProps)(signVendors);
