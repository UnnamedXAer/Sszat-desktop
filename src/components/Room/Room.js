import React from 'react';
import classes from './Room.module.css';
import Row from '../SidePanel/Row/Row';

const menuItems = [
    {
        label: "Open profile in browser",
        click: () => {
            console.log("room");
        },
    },
];

const room = React.memo(props => {
    const img = require('../../assets/images/fileTypesThumb/Image.ico');

    const closeButtonStyles = [classes.CloseButton];
    if (props.showCloseBtn && props.isOpened) {
        closeButtonStyles.push(classes.Show);
    }

    return (
        <Row menuItems={menuItems} isActive={props.active} status={props.status} clicked={props.clicked} >
            <div className={classes.Avatar}><img src={img} alt={props.alt ? props.alt : ""} /></div>
            <div className={[(props.isOpened ? classes.Opened : classes.Closed), classes.Text].join(" ")}>
                {props.text}
            </div>
            <button className={closeButtonStyles.join(" ")}>x</button>
        </Row>
    );
});


export default room;