import React from 'react';
import classes from './Row.module.css';

import WithContextMenu from '../../../hoc/withContextMenu/withContextMenu';

const contextMenuOptions = [
    {
        type: "option",
        title: "Go to Browser",
        clickHandler: (ev) => { 
            console.log(ev)
        }
    },
    {
        type: "option",
        title: "Find in google",
        clickHandler: () => { }
    },
    {
        type: "separator"
    },
    {
        type: "option",
        title: "Copy",
        clickHandler: () => { }
    },
    {
        type: "option",
        title: "Paste",
        clickHandler: () => { }
    },
    {
        type: "option",
        title: "Cut",
        clickHandler: () => { }
    },
];

const row = props => {
    const img = require('../../../assets/images/logo192.png');
    const rowStyles = [classes.Row];
    if (props.active) 
        rowStyles.push(classes.Active);
    
        rowStyles.push(props.isOpened ? classes.Opened : classes.Closed);


    const diodeStyles = [classes.StatusDiode];
    switch (props.status) { // TODO - mb do it base last active time
        case "active":
            diodeStyles.push(classes.Green);
            break;
        case "afk":
            diodeStyles.push(classes.Orange);
            break;
        case "long-afk":
            diodeStyles.push(classes.Red);
            break;
        default:
            break;
    }

    const closeButtonStyles = [classes.CloseButton];
    if (props.showCloseBtn && props.isOpened) {
        closeButtonStyles.push(classes.Show);
    }

    return (
        <WithContextMenu options={contextMenuOptions}>
            <div className={rowStyles.join(" ")}>
                <div className={classes.Avatar}><img src={img} alt={props.alt ? props.alt : ""} /></div>
                <div className={classes.Text}>
                    {props.text}
                </div>
                <button className={closeButtonStyles.join(" ")}>x</button>
                <div className={diodeStyles.join(" ")}></div>
            </div>
        </WithContextMenu>
    );
};


export default row;