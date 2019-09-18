import React from 'react';
import classes from './Attachment.module.css';

import Spinner from '../../../../UI/Spinner/Spinner';
import { IMAGE_EXTENSIONS, getFileTypeIcon, getBase64dataType } from '../../../../../utils/attachments';
const { remote } = window.require("electron");
const { Menu } = remote;

const Attachment = ({ext, file, path, deleteAttachment}) => {

    const attachmentMenuItems = [
        {
            label: "Delete",
            click: () => {console.log(path); deleteAttachment(path);}
        }
    ];

    const contextMenuAttachmentHandler = ev => {
        ev.preventDefault();
        const menu = Menu.buildFromTemplate(attachmentMenuItems);
        menu.popup();
    }

    const getFileThumb = (ext, file) => {

        let fileThumb;

        // if image then show img as preview in otherwise find icon related to file type
        if (IMAGE_EXTENSIONS.includes(ext)) {
            const base64dataType = getBase64dataType(ext);
            debugger;
            fileThumb = <img className={classes.Image} src={'data:image/jpeg;base64,' + file.toString('base64')} alt={""} />;
        }
        else {
            let fileIcon = getFileTypeIcon(ext);
            let fileTypeIcon;
            try {
                fileTypeIcon = require(`../../../../../assets/images/fileTypesThumb/svg/${fileIcon}`);
            }
            catch (err) {
                console.log(err);
            }
            fileThumb = <img className={classes.Image} src={fileTypeIcon} alt={""} />;
        }

        return fileThumb;
    }   

    return <div onContextMenu={contextMenuAttachmentHandler} ><div className={classes.Attachment} >
        {file ? getFileThumb(ext, file) : <Spinner />}
    </div></div>
};

export default Attachment;