import React, { useState } from 'react'
import classes from './SidePanel.module.css';

import Toggler from '../../components/UI/Toggler/Toggler';

const SidePanel = props => {

    const [isOpened, setIsOpened] = useState(true);
    const openState = isOpened ? 'Opened' : 'Closed';

    const togglerClickHandler = ev => {
        const _isOpened = isOpened;
        setIsOpened(!_isOpened);
    }

    return (
        <div className={[classes.SidePanel, classes[openState]].join(" ")}>
            <div className={classes.Header}>
                <div className={classes.HeightKeeper}>
                    <Toggler opened={isOpened} clicked={togglerClickHandler} />
                    <div className={classes.HeaderTextWrapper}>
                        <h5>{props.headerTitle}</h5>
                        <p>{props.headerText}</p>
                    </div>
                </div>
            </div>
            {props.children(isOpened)}
        </div>
    );
};

export default SidePanel;