import React from 'react';
import classes from './FullScreenPreview.module.css';
import { getBase64dataType, imagesExtBase64dataType, getFileTypeIcon } from '../../../utils/attachments';
import Backdrop from '../../UI/Backdrop/Backdrop';

const fullScreenPreview = ({ file, closed }) => {
    const elementStyles = [classes.Element];
    if (file.ext === ".svg") {
        elementStyles.push(classes.Svg);
    }

    let element = null;

    if (imagesExtBase64dataType.hasOwnProperty(file.ext)) {
        const base64dataType = getBase64dataType(file.ext);
        const src = base64dataType ? ('data:' + base64dataType + ';base64,' + file.data.toString('base64')) : getFileTypeIcon(file.ext);

        element = <img className={classes.Element} src={src} alt={file.name} />;
    }

    const downloadHandler = ev => {
        ev.stopPropagation();
    }

    return (
        <Backdrop show clicked={closed} >
            <div className={classes.Options}>
                <div className={classes.Option} onClick={downloadHandler}>D</div>
                <div className={classes.Option} >X</div>
            </div>
            <div className={classes.FullScreenPreview} onClick={closed}>{element}</div>
        </Backdrop>
    );
};
export default fullScreenPreview;
