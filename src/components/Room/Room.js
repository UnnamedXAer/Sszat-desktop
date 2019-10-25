import React from 'react';
import classes from './Room.module.css';
import Row from '../SidePanel/Row/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const room = React.memo(({
    menuItems,
    active,
    status,
    clicked,
    isOpened,
    showCloseBtn,
    text
}) => {
    const closeButtonStyles = [classes.CloseButton];
    if (showCloseBtn && isOpened) {
        closeButtonStyles.push(classes.Show);
    }

    return (
        <Row menuItems={menuItems} isActive={active} status={status} clicked={clicked} >
            <div className={classes.Avatar}>
                <FontAwesomeIcon icon={active ? "door-open" : "door-closed"} size="lg" />
            </div>
            <div className={[(isOpened ? classes.Opened : classes.Closed), classes.Text].join(" ")}>
                {text}
            </div>
            <button className={closeButtonStyles.join(" ")}>x</button>
        </Row>
    );
});


export default room;