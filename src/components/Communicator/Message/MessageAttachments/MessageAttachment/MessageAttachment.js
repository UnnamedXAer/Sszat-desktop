import React from 'react';
import classes from './MessageAttachment.module.css';
import { imagesExtBase64dataType } from '../../../../../utils/attachments';
import { getImageFileTypeImgSrc, getNotImageFileTypeImgSrc } from '../../../../../utils/messageAttachments';

const messageAttachment = ({ file, isSingleFile, clicked, dowloadStatus }) => {

    let img;
    const imgClasses = [isSingleFile ? classes.SingleFileImg : classes.OneOfMany];

    // check if attachment is an image
    if (imagesExtBase64dataType.hasOwnProperty(file.ext)) {
        const imgSrc = getImageFileTypeImgSrc(file);
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
        const imgSrc = getNotImageFileTypeImgSrc(file);
        imgClasses.push(classes.Svg);
        img = <img className={imgClasses.join(" ")} src={imgSrc} alt={file.name} />;
    }

    return (
        <div className={classes.MessageAttachment} onClick={() => clicked(file)}>
            {img}
            <p style={{fontSize: "0.5em"}}>{dowloadStatus}</p>
        </div>
    );
}

export default messageAttachment;