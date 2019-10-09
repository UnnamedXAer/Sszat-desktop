import React, { useEffect, useRef } from 'react';
import classes from './EmoticonsPanel.module.css'
import Emoticon from './Emoticon/Emoticon';
import EMOTICONS_LIST from '../../../../utils/emoticons';

const EmoticonsPanel = (props) => {

    const emoticonsPanelRef = useRef();

    useEffect(() => {
        emoticonsPanelRef.current.focus();
    }, []);

    const blurHandler = ev => {
        props.close();
    }

    return (
        <div className={classes.EmoticonsPanel} tabIndex="-1" onBlur={blurHandler} ref={emoticonsPanelRef}>
            {
                EMOTICONS_LIST.map(iconName => <Emoticon key={iconName} iconName={iconName} clicked={() => props.emoticonClicked(iconName)} /> )
            }
        </div>
    );
};

export default EmoticonsPanel;