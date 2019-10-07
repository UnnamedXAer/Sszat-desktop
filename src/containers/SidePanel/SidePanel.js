import React, { useState, useEffect } from 'react'
import classes from './SidePanel.module.css';

import Toggler from '../../components/UI/Toggler/Toggler';

const getInitOpenState = (panelName, width) => {
    const initState = localStorage.getItem(`panel-${panelName}-init-open-state`);
    if (initState === "opened") {
        return ((width <= 768 ? false : true));
    }
    else if (initState === "closed") {
        return (false);
    }
    const initStateBaseOnWidth = (width <= 768 ? false : true);
    localStorage.setItem(`panel-${panelName}-init-open-state`, initStateBaseOnWidth ? "opened" : "closed");
    return (initStateBaseOnWidth);
}

const SidePanel = props => {

    // todo - meh, disable this on width open state change
    const [isOpened, setIsOpened] = useState(getInitOpenState(props.children.name, props.windowDimensions.width));
    const [userChangedOpenState, setUserChangedOpenState] = useState(false);

    useEffect(() => { 
        // close panels on resize.
        const isSmall = props.windowDimensions.width <= 768;
        if (userChangedOpenState) {
            setIsOpened(isSmall ? false : true);
        }
        else if (isSmall) {
            setIsOpened(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.windowDimensions.width]);

    const togglerClickHandler = ev => {
        localStorage.setItem(`panel-${props.children.name}-init-open-state`, !isOpened ? "opened" : "closed");
        if (!userChangedOpenState) {
            setUserChangedOpenState(true);
        }
        setIsOpened(prevIsOpened => {
            return !prevIsOpened;
        });
    };

    return (
            <div className={[classes.SidePanel].join(" ")}>
                <div className={classes.Header}>
                    <div className={classes.HeightKeeper}></div>
                    <Toggler opened={isOpened} clicked={togglerClickHandler} />
                    <div className={[classes.HeaderTextWrapper, classes[(isOpened ? 'Opened' : 'Closed')]].join(" ")}>
                        <h5>{props.headerTitle}</h5>
                        <p>{props.headerText}</p>
                    </div>
                </div>
                {
                    React.cloneElement(props.children, { isOpened: isOpened })
                }
            </div>
    );
};

export default SidePanel;