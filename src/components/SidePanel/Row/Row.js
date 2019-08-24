import React from 'react';
import classes from './Row.module.css';

const row = props => {
    const img = require('../../../assets/images/logo192.png');
    const styles = [classes.Row];
    if (props.active) styles.push(classes.Active)

    console.log(props.text, props.isOpened);

    return (
        <div className={styles.join(" ")}>
            <div className={classes.Avatar}><img src={img} alt={props.alt ? props.alt : ""} /></div>
            <div className={classes.Text}>
                {props.text}
            </div>
            {props.showCloseBtn && props.isOpened ? <button className={classes.Close}>x</button> : null }
        </div>
    );
};


export default row;