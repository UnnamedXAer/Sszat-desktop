import React, { useState } from 'react';
import classes from './ContextMenu.module.css';

const ContextMenu = (props) => {

    const [isOpened, setIsOpened] = useState(true);

    const options = props.options.map(x => {
        if (x.type === "option") {
            return <button 
                key={x.title}
                className={classes.Option} 
                onClick={x.clickHandler}
            >
                {x.title}
            </button>;
        }
        else if (x.type === "separator") {
            return <span className={classes.Separator}></span>;
        }
        return null;
    })

    return (
        <div 
            className={[classes.ContextMenu, isOpened && classes.Opened].join(" ")}
            style={{top: '100px'/*props.position.top*/, left: '100px'/*props.position.left*/}}
        >
            {options}
        </div>
    );
};

export default ContextMenu;
