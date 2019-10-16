import React from 'react';
import classes from './FullScreenPreview.module.css';
import { imagesExtBase64dataType } from '../../../utils/attachments';
import { getImageFileTypeImgSrc, getNotImageFileTypeImgSrc } from '../../../utils/messageAttachments';
import Backdrop from '../../UI/Backdrop/Backdrop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fullScreenPreview = ({ file, closed }) => {

    const downloadClickHandler = ev => {
        ev.stopPropagation();

        //
    };

    const shareClickHandler = (ev, appName) => {
        ev.stopPropagation();

        // 
    };

    const mailClickHandler = ev => {
        ev.stopPropagation();

        //
    };

    const expandClickHandler = ev => {
        ev.stopPropagation();

        //
    };

    
    let isAnImageTypFile = imagesExtBase64dataType.hasOwnProperty(file.ext);
    let img;
    const imgClasses = [classes.Image];
    
    // check if attachment is an image
    if (isAnImageTypFile) {
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
        <Backdrop show clicked={closed} >
            <div className={classes.FullScreenPreview} onClick={closed}>
                <div className={classes.Element}>{img}</div>
                <div className={classes.Options}>
                    <div className={classes.Option} onClick={downloadClickHandler} ><FontAwesomeIcon icon="download" /></div>
                    <div className={classes.Option} onClick={ev => shareClickHandler(ev, 'facebook-messenger')} ><FontAwesomeIcon icon={['fab', 'facebook-messenger']}/></div>
                    <div className={classes.Option} onClick={mailClickHandler} ><FontAwesomeIcon icon="envelope"/></div>
                    {isAnImageTypFile && <div className={classes.Option} onClick={expandClickHandler}><FontAwesomeIcon icon="expand"/></div>}
                </div>
            </div>
        </Backdrop>
    );
};
export default fullScreenPreview;
