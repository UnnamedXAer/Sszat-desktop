import React, { useState, useEffect } from 'react';
import classes from './MessageAttachments.module.css';
import MessageAttachment from './MessageAttachment/MessageAttachment';
import FullScreenPreview from '../../FullScreenPreview/FullScreenPreview';
import Spinner from '../../../UI/Spinner/Spinner';
const { ipcRenderer } = window.require("electron");

const MessageAttachments = ({ isMyMessage, files }) => {

	const [displayedFile, setDisplayedFile] = useState(null);
	const [downloadLoading, setDownloadLoading] = useState(false);
	const [downloadedFilesStatus, setDownloadedFilesStatus] = useState({});

	const attachmentClickHandler = file => {
		setDisplayedFile(file);
	};

	const filePreviewCloseHandler = ev => {
		setDisplayedFile(null);
	};

	const fileDownloadCompleteHanler = (ev, response) => {
		console.log('response', response)
		const fileId = response.fileId;
		if (response.error) {
			setDownloadedFilesStatus(prevStatuses => {
				console.log('prevStatuses', prevStatuses)
				const updatedStatuses = { ...prevStatuses };
				updatedStatuses[fileId] = "FAIL";
				return updatedStatuses;
			});
		}
		else {
			setDownloadedFilesStatus(prevStatuses => {
				console.log('prevStatuses', prevStatuses)
				const updatedStatuses = { ...prevStatuses };
				updatedStatuses[fileId] = "SUCCESS";
				return updatedStatuses;
			});
		}

	};

	useEffect(() => {
		if (Object.values(downloadedFilesStatus).every(status => status === "SUCCESS")) {
			setDownloadLoading(false);
		}
	}, [downloadedFilesStatus])

	useEffect(() => {
		console.log('add: "attachment-download-end"')
		ipcRenderer.on("attachment-download-end", fileDownloadCompleteHanler);
		return () => {
			console.log('remove ("attachment-download-end"')
			ipcRenderer.removeListener("attachment-download-end", fileDownloadCompleteHanler)
		};
	}, []);


	const downloadAllAttachmentsHandler = () => {
		setDownloadLoading(true);
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

	let downloadText = "Download file.";
	if (!isSingleFile) {
		downloadText = "Download ALL files.";
	}

	const attachments = files.map(file => (
		<MessageAttachment key={file.id} file={file} isSingleFile={isSingleFile} clicked={attachmentClickHandler} dowloadStatus={downloadedFilesStatus[file.id]} />
	));

	return (
		<div className={[classes.MessageAttachments, (isMyMessage ? classes.My : classes.Your)].join(" ")}>
			<div className={classes.AttachmentsContainer}>
				{attachments}
				{downloadLoading && <div style={{ height: "30px", width: "100%" }}><Spinner /></div>}
			</div>
			<p className={classes.DownloadText} onClick={downloadAllAttachmentsHandler}>{downloadText}</p>
			{displayedFile && <FullScreenPreview file={displayedFile} closed={filePreviewCloseHandler} />}
		</div>
	);
};

export default MessageAttachments;