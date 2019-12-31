import React from 'react';
import classes from './Row.module.css';
import userStatuses from '../../../utils/userStatuses';
const { remote } = window.require("electron");
const { Menu } = remote;

const row = React.memo(props => {
    const rowStyles = [classes.Row];
    if (props.isActive) 
		rowStyles.push(classes.Active);
		
	const diodeStyles = [classes.StatusDiode];
	switch (props.status) {
		case userStatuses.ACTIVE:
			diodeStyles.push(classes.Green);
			break;
		case userStatuses.AFK:
			diodeStyles.push(classes.Orange);
			break;
		case userStatuses.OFFLINE:
			diodeStyles.push(classes.Red);
			break;
		default:
			diodeStyles.push(classes.Gray);
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