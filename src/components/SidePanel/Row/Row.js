import React from 'react';
import classes from './Row.module.css';
import { request } from 'https';

const row = props => {
    const img = require('../../../assets/images/logo192.png')
    return (
        <div className={classes.Row}>
            <div className={classes.Avatar}><img src={img} /></div>
            <div className={classes.Text}>
                {props.text}
            </div>
        </div>
    );
};


export default row;