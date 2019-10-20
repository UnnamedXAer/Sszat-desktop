import React, { useState } from 'react';
import classes from './MessageAttachments.module.css';
import MessageAttachment from './MessageAttachment/MessageAttachment';
import FullScreenPreview from '../../FullScreenPreview/FullScreenPreview';
const { ipcRenderer } = window.require("electron");

const MessageAttachments = ({ isMyMessage, files}) => {

    const [displayedFile, setDisplayedFile] = useState(null);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [downloadedFilesStatus, setDownloadedFilesStatus] = useState([]);
    
    const attachmentClickHandler = file => {
        setDisplayedFile(file);
    }

    const filePreviewCloseHandler = ev => {
        setDisplayedFile(null);
    }

    const downloadAllAttachmentsHandler = () => {
        setDownloadLoading(true);
        files.forEach(file => {
            setDownloadedFilesStatus(prevStatuses => {
                const updatedStatuses = [...prevStatuses];
                updatedStatuses[file.id] = "DOWNLOADING";
                return updatedStatuses;
            });
            downloadFile(file)
                .then(res => {
                    setDownloadedFilesStatus(prevStatuses => {
                        const updatedStatuses = [...prevStatuses];
                        updatedStatuses[file.id] = "SUCCESS";
                        return updatedStatuses;
                    });
                    console.log(res);
                })
                .catch(err => {
                    setDownloadedFilesStatus(prevStatuses => {
                        const updatedStatuses = [...prevStatuses];
                        updatedStatuses[file.id] = "FAIL";
                        return updatedStatuses;
                    });
                    console.log(err)
                });
        });
    };

    const downloadFile = file => {
        return new Promise((resolve, reject) => {
            ipcRenderer.on("attachment-download-end", (ev, response) => {
                if (response.error) {
                    reject(response.error);
                }
                else  {
                    resolve(response.fileId);
                }
            })
            ipcRenderer.send("download-attachment", {
                file: file,
                path: ""
            });
        });
    }

    const numOfFiles = files.length

    if (!files || numOfFiles === 0) {
        return [];
    }

    const isSingleFile = numOfFiles === 1;

    let downloadText = "Download file.";
    if (!isSingleFile) {
        downloadText = "Download ALL files.";
    }

    const attachments =  files.map(file => (
        <MessageAttachment key={file.id} file={file} isSingleFile={isSingleFile} clicked={attachmentClickHandler} dowloadStatus={downloadedFilesStatus[file.id]} />
    ));

    return (
        <div className={[classes.MessageAttachments, (isMyMessage ? classes.My : classes.Your)].join(" ")}>
            <div className={classes.AttachmentsContainer}>
                {attachments}
                {downloadLoading && <div style={{height: "30px", width: "100%"}}></div>}
            </div>
            <p className={classes.DownloadText} onClick={downloadAllAttachmentsHandler}>{downloadText}</p>
            {displayedFile && <FullScreenPreview file={displayedFile} closed={filePreviewCloseHandler} />}
        </div>
    )
}

export default MessageAttachments;