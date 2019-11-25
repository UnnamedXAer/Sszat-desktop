import React, { useState, useEffect } from 'react';
import classes from './MessageAttachments.module.css';
import MessageAttachment from './MessageAttachment/MessageAttachment';
import FullScreenPreview from '../../FullScreenPreview/FullScreenPreview';
const { ipcRenderer } = window.require("electron");

const MessageAttachments = ({ isMyMessage, files }) => {

	const [displayedFile, setDisplayedFile] = useState(null);
	const [downloadedFilesStatus, setDownloadedFilesStatus] = useState({});

	const attachmentClickHandler = file => {
		setDisplayedFile(file);
	};

	const filePreviewCloseHandler = ev => {
		setDisplayedFile(null);
	};

	const fileDownloadCompleteHandler = (ev, response) => {
		const fileId = response.fileId;
		if (response.error) {
			setDownloadedFilesStatus(prevStatuses => {
				const updatedStatuses = { ...prevStatuses };
				updatedStatuses[fileId] = "FAIL";
				return updatedStatuses;
			});
		}
		else {
			setDownloadedFilesStatus(prevStatuses => {
				const updatedStatuses = { ...prevStatuses };
				updatedStatuses[fileId] = "SUCCESS";
				return updatedStatuses;
			});
		}

	};

	useEffect(() => {
		ipcRenderer.on("attachment-download-end", fileDownloadCompleteHandler);
		return () => {
			ipcRenderer.removeListener("attachment-download-end", fileDownloadCompleteHandler)
		};
	}, []);


	const downloadAllAttachmentsHandler = () => {
		files.forEach(file => {
			setDownloadedFilesStatus(prevStatuses => {
				const updatedStatuses = { ...prevStatuses };
				updatedStatuses[file.id] = "DOWNLOADING";
				return updatedStatuses;
			});

			downloadFile(file);
		});
	};

	const downloadFile = file => {
		ipcRenderer.send("download-attachment", {
			file: file,
			path: ""
		});
	};

	const numOfFiles = files.length

	if (!files || numOfFiles === 0) {
		return [];
	}

	const isSingleFile = numOfFiles === 1;

	let downloadAllText = "Download file.";
	if (!isSingleFile) {
		downloadAllText = "Download ALL files.";
	}

	const attachments = files.map(file => (
		<MessageAttachment key={file.id} file={file} isSingleFile={isSingleFile} clicked={attachmentClickHandler} downloadStatus={downloadedFilesStatus[file.id]} />
	));

	return (
		<div className={[classes.MessageAttachments, (isMyMessage ? classes.My : classes.Your)].join(" ")}>
			<div className={classes.AttachmentsContainer}>
				{attachments}
			</div>
			<p className={classes.DownloadAllText} onClick={downloadAllAttachmentsHandler}>{downloadAllText}</p>
			{displayedFile && <FullScreenPreview file={displayedFile} closed={filePreviewCloseHandler} />}
		</div>
	);
};

export default MessageAttachments;