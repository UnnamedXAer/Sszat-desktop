import React from 'react';
import classes from './CommunicatorHeader.module.css';
import Logo from '../../UI/Logo/Logo';

const communicatorHeader = props => {
    return (
        <div className={classes.CommunicatorHeader} >
            <div className={classes.HeightKeeper}>
                <Logo />
                <h2>{props.title}</h2>
            </div>
        </div>
    );
}

export default communicatorHeader;