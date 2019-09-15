import React from 'react';
import classes from './SendAttachments.module.css';
import Spinner from '../../../UI/Spinner/Spinner';
import getThumbName from '../../../../utils/attachments';

const sendAttachments = props => {

    const attachments = props.files.map(x => {

        const getFileThumb = (ext, file) => {

            let fileThumb;

            switch (ext) {
                case '.jpeg':
                case '.jpg':
                case '.png':
                case '.gif':
                    fileThumb = <img className={classes.Image} src={x.data} alt={""} />;
                    break;
                default:
                    let fileTypeIcon;
                    try {
                        fileTypeIcon = require(`../../../../assets/images/fileTypesThumb/${getThumbName(ext)}`);
                    }
                    catch (err) {
                        
                    }
                    fileThumb = <img className={classes.Image} src={fileTypeIcon} alt={""} />;
                    break;
            }

            return fileThumb
        }   

        return <div key={x.path} className={classes.Thumb} >
            {x.file ? getFileThumb(x.ext, x.file) : <Spinner />}
        </div>
    });

    return (
        <div className={classes.SendAttachments} >
            {attachments}
        </div>
    );
};

export default sendAttachments;