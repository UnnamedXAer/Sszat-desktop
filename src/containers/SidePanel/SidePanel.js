import React, { useState, useEffect } from 'react'
import classes from './SidePanel.module.css';

import Toggler from '../../components/UI/Toggler/Toggler';

const SidePanel = props => {

    const [isOpened, setIsOpened] = useState(props.windowDimensions.width <= 768 ? false : true);

    useEffect(() => {
        setIsOpened(props.windowDimensions.width <= 768 ? false : true);
    }, [props.windowDimensions]);

    const togglerClickHandler = ev => {
        setIsOpened(prevIsOpened => !prevIsOpened);
    };

    return (
        <div className={[classes.SidePanel, classes[(isOpened ? 'Opened' : 'Closed')]].join(" ")}>
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