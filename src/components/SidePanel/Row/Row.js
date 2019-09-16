import React from 'react';
import classes from './Row.module.css';
const { remote } = window.require("electron");
const { Menu } = remote;

const rowMenuItems = [
    {
        role: "Cut",
        click: () => {
            alert('Cut.')
        },
    },
    {
        role: "copy",
        click: () => alert("Copied.")
    },
    {
        role: "paste",
        click: () => alert("Pasted.")
    },
    {
        type: "separator"
    },
    {
        label: "tmp imte menu 123"
    }
];

const row = React.memo(props => {
    const img = require('../../../assets/images/fileTypesThumb/Microsoft paint.ico');
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

    const contextMenuHandler = ev => {
        ev.preventDefault();
        const menu = Menu.buildFromTemplate(rowMenuItems);
        menu.popup();
    }

    return (
            <div className={rowStyles.join(" ")} onContextMenu={contextMenuHandler}>
                <div className={classes.Avatar}><img src={img} alt={props.alt ? props.alt : ""} /></div>
                <div className={classes.Text}>
                    {props.text}
                </div>
                <button className={closeButtonStyles.join(" ")}>x</button>
                <div className={diodeStyles.join(" ")}></div>
            </div>
    );
});


export default row;