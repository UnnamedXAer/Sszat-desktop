import React from 'react';
import classes from './MessageAttachment.module.css';
import { imagesExtBase64dataType, getBase64dataType, getFileTypeIcon } from '../../../../utils/attachments';


const messageAttachment = ({ file, isSingleFile, clicked }) => {

    let img;
    const imgClasses = [isSingleFile ? classes.SingleFileImg : classes.OneOfMany];

    // check if attachment is an image
    if (imagesExtBase64dataType.hasOwnProperty(file.ext)) {
        // if file is image display it
        const base64data = file.data.toString('base64');
        const base64dataType = getBase64dataType(file.ext);
        const imgSrc = `data:${base64dataType};base64,${base64data}`;

        // todo read svg files size
        if (file.ext === ".svg") {
            imgClasses.push(classes.Svg);
        }
        img = 
            <img 
                className={imgClasses.join(" ")} 
                src={imgSrc} 
                alt={file.name}
            />
    }
    else {
        // if file is not an image display icon related to the file type
        let fileIcon = getFileTypeIcon(file.ext);
        let fileTypeIcon;
        try {
            fileTypeIcon = require(`../../../../assets/images/fileTypesThumb/svg/${fileIcon}.svg`);
        }
        catch (err) {
            console.log(err);
        }
        imgClasses.push(classes.Svg);
        img = <img className={imgClasses.join(" ")} src={fileTypeIcon} alt={file.name} />;
    }

    return (
        <div className={classes.MessageAttachment} onClick={() => clicked(file)}>
            {img}
        </div>
    );
}

export default messageAttachment;