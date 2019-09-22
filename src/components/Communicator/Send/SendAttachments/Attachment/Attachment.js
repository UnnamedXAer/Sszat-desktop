import React, { useState } from 'react';
import classes from './Attachment.module.css';

import Spinner from '../../../../UI/Spinner/Spinner';
import { imagesExtBase64dataType, getFileTypeIcon, getBase64dataType } from '../../../../../utils/attachments';
const { remote } = window.require("electron");
const { Menu } = remote;

const Attachment = ({ext, file, path, name, deleteAttachment}) => {

    const [bgToggled, setBgToggled] = useState(false);

    const attachmentMenuItems = [
        {
            label: "Toggle background color",
            click: () => {
                setBgToggled(prevState => !prevState);
            }
        },
        {
            type: "separator"
        },
        {
            label: "Delete",
            click: () => {deleteAttachment(path);}
        }
    ];

    const contextMenuAttachmentHandler = ev => {
        ev.preventDefault();
        const menu = Menu.buildFromTemplate(attachmentMenuItems);
        menu.popup();
    }

    const getFileThumb = (ext, file) => {
        console.log(file);
        let fileThumb;

        // if image then show img as preview in otherwise find icon related to file type
        if (imagesExtBase64dataType.hasOwnProperty(ext)) {
            const base64dataType = getBase64dataType(ext);
            const src = base64dataType ? ('data:' + base64dataType + ';base64,' + file.toString('base64')) : getFileTypeIcon(ext);

            fileThumb = <img className={classes.Image} src={ src } alt={name} />;
        }
        else {
            let fileIcon = getFileTypeIcon(ext);
            let fileTypeIcon;
            try {
                fileTypeIcon = require(`../../../../../assets/images/fileTypesThumb/svg/${fileIcon}.svg`);
            }
            catch (err) {
                console.log(err);
            }
            fileThumb = <img className={classes.Image} src={fileTypeIcon} alt={name} />;
        }

        return fileThumb;
    }   

    const style =[classes.Attachment];
    if (bgToggled) {
        style.push(classes.ToggledBg);
    }

    return <div onContextMenu={contextMenuAttachmentHandler} ><div className={style.join(" ")} >
        {file ? getFileThumb(ext, file) : <Spinner />}
    </div></div>
};

export default Attachment;