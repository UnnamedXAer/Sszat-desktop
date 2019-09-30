import React from 'react';
import classes from './User.module.css';
import Row from '../SidePanel/Row/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const user = React.memo(props => {
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
        <Row menuItems={props.menuItems} isActive={props.active} status={props.status}>
            <div className={classes.Avatar}>
                {props.avatar ? 
                    <img src={props.avatar} alt={props.alt ? props.alt : ""} />
                    : <FontAwesomeIcon icon="user" className={classes.BlankAvatar} size="2x" />
                }
                </div>
            <div className={[(props.isOpened ? classes.Opened : classes.Closed), classes.Text].join(" ")}>
                {props.text}
            </div>
            <button className={closeButtonStyles.join(" ")}>x</button>
        </Row>
    );
});

export default user;