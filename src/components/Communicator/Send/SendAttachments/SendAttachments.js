import React from 'react';
import classes from './SendAttachments.module.css';
import Spinner from '../../../UI/Spinner/Spinner';
import getFileTypeIcon, { IMAGE_EXTENSIONS } from '../../../../utils/attachments';

const sendAttachments = React.memo(props => {

    const attachments = props.files.map(x => {

        const getFileThumb = (ext, file) => {

            let fileThumb;

            // if image then show img as preview in otherwise find icon related to file type
            if (IMAGE_EXTENSIONS.includes(ext)) {
                fileThumb = <img className={classes.Image} src={'data:image/jpeg;base64,' + file.toString('base64')} alt={""} />;
            }
            else {
                let fileIcon = getFileTypeIcon(ext);
                let fileTypeIcon;
                try {
                    fileTypeIcon = require(`../../../../assets/images/fileTypesThumb/${fileIcon}`);
                }
                catch (err) {
                    console.log(err);
                }
                fileThumb = <img className={classes.Image} src={fileTypeIcon} alt={""} />;
            }

            return fileThumb;
        }   

        return <div key={x.path} className={classes.Thumb} >
            {x.file ? getFileThumb(x.ext, x.file) : <Spinner />}
        </div>
    });

    return (
        <div className={classes.SendAttachments} >
            <div className={classes.SendAttachmentsContainer} >
                {attachments}
            </div>
        </div>
    );
});

export default sendAttachments;