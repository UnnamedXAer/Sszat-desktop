import React from 'react';
import classes from './SettingsButton.module.css';
import { connect } from 'react-redux';
import { setShowSettings } from '../../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SettingsButton = ({
	openSettings
}) => {
	return (
		<button className={classes.SettingsButton} onClick={() => openSettings(true)}>
			<FontAwesomeIcon icon="cog" />
		</button>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		openSettings: (show) => dispatch(setShowSettings(show))
	};
};


export default connect(null, mapDispatchToProps)(SettingsButton);