import React from 'react';
import classes from './FullScreenPreview.module.css';
import { getBase64dataType, imagesExtBase64dataType, getFileTypeIcon } from '../../../utils/attachments';
import Backdrop from '../../UI/Backdrop/Backdrop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const fullScreenPreview = ({ file, closed }) => {
    const elementStyles = [classes.Element];
    if (file.ext === ".svg") {
        elementStyles.push(classes.Svg);
    }

    let element = null;

    if (imagesExtBase64dataType.hasOwnProperty(file.ext)) {
        const base64dataType = getBase64dataType(file.ext);
        const src = base64dataType ? ('data:' + base64dataType + ';base64,' + file.data.toString('base64')) : getFileTypeIcon(file.ext);

        element = <img src={src} alt={file.name} />;
    }

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

    return (
        <Backdrop show clicked={closed} >
            <div className={classes.FullScreenPreview} onClick={closed}>
                <div className={classes.Element}>{element}</div>
                <div className={classes.Options}>
                    <div className={classes.Option} onClick={downloadClickHandler} ><FontAwesomeIcon icon="download" /></div>
                    <div className={classes.Option} onClick={ev => shareClickHandler(ev, 'facebook-messenger')} ><FontAwesomeIcon icon={['fab', 'facebook-messenger']}/></div>
                    <div className={classes.Option} onClick={mailClickHandler} ><FontAwesomeIcon icon="envelope"/></div>
                    <div className={classes.Option} onClick={expandClickHandler}><FontAwesomeIcon icon="expand"/></div>
                </div>
            </div>
        </Backdrop>
    );
};
export default fullScreenPreview;
