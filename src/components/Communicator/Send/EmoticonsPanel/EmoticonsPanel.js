import React, { useEffect, useRef } from 'react';
import useComponentClickOutside from '../../../../hooks/useComponentClickOutside';
import classes from './EmoticonsPanel.module.css'
import Emoticon from './Emoticon/Emoticon';
import EMOTICONS_LIST from '../../../../utils/emoticons';
import SendPanelKeyDown from '../../../../utils/SendPanelKeyDown';

const EmoticonsPanel = (props) => {

    const emoticonsPanelRef = useRef(null);
    useComponentClickOutside(emoticonsPanelRef, props.close);

    useEffect(() => {
        if (emoticonsPanelRef.current.firstChild)
            emoticonsPanelRef.current.firstChild.focus();
        else {
            emoticonsPanelRef.current.focus();
        }
    }, []);

    const keyDownControler = new SendPanelKeyDown(props.selectEmoticon, props.close, EMOTICONS_LIST);

    return (
        <div className={classes.EmoticonsPanel} tabIndex="99" ref={emoticonsPanelRef} onKeyDown={keyDownControler.handler}>
            {
                EMOTICONS_LIST.map((iconName, index) => <Emoticon 
                    key={index} 
                    tabIndex={100+index} 
                    iconName={iconName} 
                    clicked={() => props.selectEmoticon(iconName)} 
                /> )
            }
        </div>
    );
};

export default EmoticonsPanel;