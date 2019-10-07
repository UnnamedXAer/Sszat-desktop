import React from 'react';
import classes from './EmoticonsPanel.module.css'
import Emoticon from './Emoticon/Emoticon';
import EMOTICONS_LIST from '../../../../utils/emoticons';

const emoticonsPanel = (props) => {
    return (
        <div className={classes.EmoticonsPanel}>
            {
                EMOTICONS_LIST.map(iconName => <Emoticon key={iconName} iconName={iconName} clicked={() => props.emoticonClicked(iconName)} /> )
            }
        </div>
    );
};

export default emoticonsPanel;