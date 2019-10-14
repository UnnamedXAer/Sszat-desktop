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

    const keyDownController = new SendPanelKeyDown(props.selectEmoticon, props.close, EMOTICONS_LIST);

    return (
        <div className={classes.EmoticonsPanel} tabIndex="99" ref={emoticonsPanelRef} onKeyDown={keyDownController.handler}>
            {
                EMOTICONS_LIST.map((iconName, index) => <Emoticon 
                    key={index} 
                    index={index+1}
                    tabIndex={100+index} 
                    iconName={iconName} 
                    clicked={() => props.selectEmoticon(iconName)} 
                /> )
            }
        </div>
    );
};

export default EmoticonsPanel;