import React from 'react';
import classes from './CommunicatorHeader.module.css';

const communicatorHeader = props => {
    return (
        <div className={classes.CommunicatorHeader} >
            <h4>{props.title}</h4>
        </div>
    );
}

export default communicatorHeader;