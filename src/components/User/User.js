import React from 'react';
import classes from './User.module.css';
import Row from '../SidePanel/Row/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const user = React.memo(props => {

    const closeButtonStyles = [classes.CloseButton];
    if (props.showCloseBtn && props.isOpened) {
        closeButtonStyles.push(classes.Show);
    }

    const textStyles = [classes.Text];
    textStyles.push((props.isOpened ? classes.Opened : classes.Closed));
    if(props.isCurrentUser) {
        textStyles.push(classes.CurrentUser);
    }

    return (
        <Row menuItems={props.menuItems} isActive={props.active} status={props.status}>
            <div className={classes.Avatar}>
                {props.avatar ? 
                    <img src={props.avatar} alt={props.alt ? props.alt : ""} />
                    : <FontAwesomeIcon icon="user" className={classes.BlankAvatar} size="2x" />
                }
                </div>
            <div className={textStyles.join(" ")}>
                {props.text}
            </div>
            <button className={closeButtonStyles.join(" ")}>x</button>
        </Row>
    );
});

export default user;