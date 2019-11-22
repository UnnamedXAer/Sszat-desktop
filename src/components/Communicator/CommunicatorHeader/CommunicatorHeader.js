import React from 'react';
import classes from './CommunicatorHeader.module.css';
import Logo from '../../UI/Logo/Logo';
import SettingsButton from '../../UI/SettingsButton/SettingsButton';

const communicatorHeader = props => {
    return (
        <div className={classes.CommunicatorHeader} >
            <div className={classes.HeightKeeper}>
                <Logo />
                <h2>{props.title}</h2>
				<SettingsButton />
            </div>
        </div>
    );
}

export default communicatorHeader;