import React from 'react';
import classes from './TextField.module.css';

const { remote } = window.require("electron");
const { Menu } = remote;

const menuItems = [
    {
        role: "selectAll"
    },
    {
        type: "separator"
    },
    {
        role: "copy"
    }, 
    {
        role: "paste",
    },
    {
        role: "cut"
    }
];

const textField = ({
    highlighted,
    textChanged,
    keyDown,
    currentText,
    focused,
    blurred,
    fieldRef
}) => {

    const contextMenuHandler = ev => {
        ev.preventDefault();
        const menu = Menu.buildFromTemplate(menuItems);
        menu.popup();
    }

    const styles = [classes.TextField];
    if (highlighted) {
        styles.push(classes.Highlighted);
    }
    return (
        <div className={styles.join(" ")}>
            <textarea
                ref={fieldRef}
                lang="pl-PL"
                tabIndex="1"
                autoComplete="off" 
                spellCheck="true"
                rows="2"
                onChange={textChanged}
                onKeyDown={keyDown}
                value={currentText}
                onFocus={focused}
                onBlur={blurred}
                onContextMenu={contextMenuHandler}
            />
        </div>
    );
}

export default textField;