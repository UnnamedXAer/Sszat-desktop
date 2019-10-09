import React, { useEffect, useRef } from 'react';
import classes from './EmoticonsPanel.module.css'
import Emoticon from './Emoticon/Emoticon';
import EMOTICONS_LIST from '../../../../utils/emoticons';

const EmoticonsPanel = (props) => {

    const emoticonsPanelRef = useRef();
    let timeout = null;

    useEffect(() => {
        if (emoticonsPanelRef.current.firstChild)
            emoticonsPanelRef.current.firstChild.focus();
        else {
            emoticonsPanelRef.current.focus();
        }
    }, []);

    const focusHandler = ev => {
        clearTimeout(timeout);
    }

    const blurHandler = ev => {
        timeout = setTimeout(props.close, 100);
    }

    const keyDownHandler = ev => {
        if (ev.keyCode === 27) {
            props.close();
        }
    }

    return (
        <div className={classes.EmoticonsPanel} tabIndex="99" onFocus={focusHandler} onBlur={blurHandler} ref={emoticonsPanelRef} onKeyDown={keyDownHandler}>
            {
                EMOTICONS_LIST.map((iconName, index) => <Emoticon key={index} tabIndex={100+index} iconName={iconName} clicked={() => props.emoticonClicked(iconName)} /> )
            }
        </div>
    );
};

export default EmoticonsPanel;