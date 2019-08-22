import React from 'react';
import classes from './SidePanel.module.css';


const SidePanel = props => {
    const openState = props.opened ? 'opened' : 'closed';
    return (
        <div className={[classes.SidePanel, classes[openState]].join(" ")}>
            <div className={classes.Header}>
                <div className={classes.HeightKeeper}>
                    {props.headerTitle}  
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default SidePanel;