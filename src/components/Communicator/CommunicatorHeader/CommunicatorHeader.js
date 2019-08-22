import React from 'react';
import classes from './CommunicatorHeader.module.css';

const communicatorHeader = props => {
    return (
        <div className={classes.CommunicatorHeader} >
            <div className={classes.HeightKeeper}>
                <h4>{props.title}</h4>
            </div>
        </div>
    );
}

export default communicatorHeader;