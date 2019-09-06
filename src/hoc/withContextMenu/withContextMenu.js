import React, { useState, useRef, useEffect } from 'react';
// import classes from './withContextMenu.module.css';

import Electron from 'electron';


const WithContextMenu = (props) => {

    const [isOpened, setIsOpened] = useState(false);
    const wrapperRef = useRef();

    useEffect(() => {

        const contextmenuHandler = ev => {
            debugger;
        }
        const div = wrapperRef.current;
        div.addEventListener("contextmenu", contextmenuHandler);
        return () => {
            div.removeEventListener("contextmenu", contextmenuHandler);
        };
    }, [])

    return (
        <div ref={wrapperRef}>
            {props.children}
        </div>
    );
};

export default WithContextMenu;
