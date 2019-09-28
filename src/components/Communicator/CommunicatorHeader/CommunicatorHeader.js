import React from 'react';
import classes from './CommunicatorHeader.module.css';

const communicatorHeader = props => {
    return (
        <div className={classes.CommunicatorHeader} >
            <div className={classes.HeightKeeper}>
                <h2>{props.title}</h2>
            </div>
        </div>
    );
}

export default communicatorHeader;