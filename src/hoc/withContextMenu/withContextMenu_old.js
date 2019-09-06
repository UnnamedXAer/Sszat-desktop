import React, { useState } from 'react';
import classes from './withContextMenu.module.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const WithContextMenu = (props) => {

    const [isOpened, setIsOpened] = useState(true);

    const windowDimensions = useWindowDimensions();

    const toggleContextMenuHandler = (ev) => {
        console.log('WithContextMenu -> ', ev);
        setIsOpened(prevIsOpened => !prevIsOpened);
    }

    const options = props.options.map((x, i) => {
        if (x.type === "option") {
            return <button 
                key={i}
                className={classes.Option} 
                onClick={x.clickHandler}
            >
                {x.title}
            </button>;
        }
        else if (x.type === "separator") {
            return <span 
                key={i}
                className={classes.Separator}>
            </span>;
        }
        return null;
    })

    return (
        <React.Fragment >
            {props.children}
            {
                isOpened && <div 
                    className={[classes.ContextMenu, isOpened && classes.Opened].join(" ")}
                    style={{top: '100px'/*props.position.top*/, left: '100px'/*props.position.left*/}}
                >
                    {options}
                </div>
            }
        </React.Fragment>
    );
};

export default WithContextMenu;
