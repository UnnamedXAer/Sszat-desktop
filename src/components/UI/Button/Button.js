import React from 'react';
import classes from './Button.module.css';

const button = ({ children, style, btnType, clicked, disabled }) => {
    return (
        <button 
            className={[classes.Button, classes[btnType]].join(" ")} 
            style={style}
            onClick={clicked} 
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default button;