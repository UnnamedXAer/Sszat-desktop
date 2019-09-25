import React from 'react';
import classes from './User.module.css';
import Row from '../SidePanel/Row/Row';

const menuItems = [
    {
        label: "Open profile in browser",
        click: () => {
            console.log("Open profile in browser clicked.");
        },
    },
];


const user = React.memo(props => {
    const img = require('../../assets/images/fileTypesThumb/Microsoft paint.ico');

    
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
        default:
            break;
    }

    const closeButtonStyles = [classes.CloseButton];
    if (props.showCloseBtn && props.isOpened) {
        closeButtonStyles.push(classes.Show);
    }

    return (
        <Row menuItems={menuItems} isActive={props.active} status={props.status}>
            <div className={classes.Avatar}><img src={img} alt={props.alt ? props.alt : ""} /></div>
            <div className={[(props.isOpened ? classes.Opened : classes.Closed), classes.Text].join(" ")}>
                {props.text}
            </div>
            <button className={closeButtonStyles.join(" ")}>x</button>
        </Row>
    );
});

export default user;