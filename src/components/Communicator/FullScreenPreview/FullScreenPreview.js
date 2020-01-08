import React, { useState, useEffect, useRef } from 'react';
import classes from './FullScreenPreview.module.css';
import { imagesExtBase64dataType } from '../../../utils/attachments';
import { getImageFileTypeImgSrc, getNotImageFileTypeImgSrc } from '../../../utils/messageAttachments';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Spinner from '../../UI/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { ipcRenderer } = window.require("electron");

const FullScreenPreview = ({ file, closed }) => {

    const [loading, setLoading] = useState(false);
	const [savingStatus, setSavingStatus] = useState("NOT-EXECUTED");
	const backdropRef = useRef(null);

    const downloadClickHandler = ev => {
        ev.stopPropagation();
        setLoading(true);

        ipcRenderer.send("download-attachment", {
            file: file,
            path: ""
        });
    };

    const attachmentDownloadedHandler = (ev, response) => {
        if (response.error) {
            setSavingStatus("FAIL");
        }
        else {
            setSavingStatus("SUCCESS");
        }

        setLoading(false);
    }

    useEffect(() => {
        ipcRenderer.on("attachment-download-end", attachmentDownloadedHandler);
        return () => {
            ipcRenderer.removeListener("attachment-download-end", attachmentDownloadedHandler)
        };
    }, [])

    const shareClickHandler = (ev, appName) => {
        ev.stopPropagation();
    };

    const mailClickHandler = ev => {
        ev.stopPropagation();
    };

    const expandClickHandler = ev => {
		ev.stopPropagation();
		backdropRef.current.requestFullscreen();
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

    let savingElement;
    if (loading) {
        savingElement = <div className={classes.Option}><Spinner /></div>;
    }
    else {
        switch (savingStatus) {
            case "NOT-EXECUTED":
                savingElement = <div className={classes.Option} onClick={downloadClickHandler} >
						<FontAwesomeIcon icon="download" />
					</div>
                break;
            case "SUCCESS":
				savingElement = <div 
						className={["fa-layers fa-fw",classes.Option].join(" ")} 
						onClick={downloadClickHandler} 
					>
                        <FontAwesomeIcon icon="download" />
                        <FontAwesomeIcon icon="check" color="darkcyan" transform="shrink-10 up-6 right-6"/>
                    </div>
                break;
            case "FAIL": 
				savingElement = <div 
						className={["fa-layers fa-fw",classes.Option].join(" ")} 
						onClick={downloadClickHandler} 
					>
                        <FontAwesomeIcon icon="download" />
                        <FontAwesomeIcon icon="times" color="Tomato" transform="shrink-10 up-6 right-6"/>
                    </div>
                break;
            default:
                break;
        }
    }

    return (
		<Backdrop show clicked={closed} backdropRef={backdropRef} >
            <div className={classes.FullScreenPreview} onClick={closed}>
                <div className={classes.Element}>{img}</div>
                <div className={classes.Options}>
                    {savingElement}
					<div 
						className={classes.Option} 
						onClick={ev => shareClickHandler(ev, 'facebook-messenger')} >
						<FontAwesomeIcon icon={['fab', 'facebook-messenger']}/>
					</div>
                    <div className={classes.Option} onClick={mailClickHandler} >
						<FontAwesomeIcon icon="envelope"/>
					</div>
					{isAnImageTypFile 
						&& <div 
							className={classes.Option} 
							onClick={expandClickHandler}>
								<FontAwesomeIcon icon="expand"/>
							</div>}
                </div>
            </div>
        </Backdrop>
    );
};
export default FullScreenPreview;
