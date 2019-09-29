import React from 'react';
import classes from './Row.module.css';
const { remote } = window.require("electron");
const { Menu } = remote;

const row = React.memo(props => {
    const rowStyles = [classes.Row];
    if (props.isActive) 
        rowStyles.push(classes.Active);

    const diodeStyles = [classes.StatusDiode];
    switch (props.status) { 
        case "active":
            diodeStyles.push(classes.Green);
            break;
        case "afk":
            diodeStyles.push(classes.Orange);
            break;
        case "long-afk":
            diodeStyles.push(classes.Red);
            break;
        case "offline":
            diodeStyles.push(classes.Gray);
            break;
        default:
            break;
    }

    const contextMenuHandler = ev => {
        ev.preventDefault();
        if (props.menuItems) {
            const menu = Menu.buildFromTemplate(props.menuItems);
            menu.popup();
        }
    }

    return (
        <div className={rowStyles.join(" ")} onContextMenu={contextMenuHandler} onClick={props.clicked} >
            {props.children}
            {props.status && <div className={diodeStyles.join(" ")}></div>}
        </div>
    );
});


export default row;