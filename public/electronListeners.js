const { ipcMain, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const debug = require("debug");
const debugError = debug("error");
const debugLog = debug("log");
const debugging = debug("debugging");
const { saveAttachment } = require("./utils/attachments");
const { getThirdPartAuthHandler } = require('./authByThirdPart');


const addListenersToIpcMain = (mainWindow, tray) => {
	ipcMain.on("message-received", (ev, payload) => {
		debugging("New Message Received %o", payload);
		mainWindow.once('focus', () => {
			mainWindow.flashFrame(false);
		});
		mainWindow.flashFrame(true);
	});
	ipcMain.on("status-changed", getAppStatusChangeHandler(mainWindow, tray));
	ipcMain.on("download-attachment", (ev, payload) => {
		saveAttachment(payload.file)
			.then(res => {
				debugging("download-attachment.then res: %O", res);
				ev.sender.send("attachment-download-end", {
					fileId: res
				});
			})
			.catch(err => {
				debugError('err %O', err);
				debugging("download-attachment.catch err: %s", err.message);
				ev.sender.send("attachment-download-end", {
					fileId: payload.file.id,
					error: err.message
				});
			});
	});
	ipcMain.on("signIn3rdPart-completed", (ev, payload) => {
		debugLog(`[ AuthCompleted ] %o`, payload);
		mainWindow.webContents.send("signIn3rdPart-completed", payload);
	});
	ipcMain.on("signIn3rdPart", getThirdPartAuthHandler(mainWindow));
}

const getAppStatusChangeHandler = (mainWindow, tray) => (ev, payload) => {
	debugging("status-changed, payload: %O", payload);
	const { status } = payload;
	let iconName;
	switch (status) {
		case "Away from keyboard":
			iconName = "afk.png";
			break;
		case "Active":
			iconName = "online.png";
			break;
		case "Offline":
			iconName = "offline.png";
			break;
		default:
			iconName = "default.png";
			break;
	}

	const statusIconPath = path.join(__dirname, (isDev ? `/assets/status/${iconName}` : `../build/assets/status/${iconName}`));
	const icon = nativeImage
		.createFromPath(statusIconPath)
		.resize({ height: 6, width: 6, quality: "good" });
	mainWindow.setOverlayIcon(icon, status ? status : "");
	tray.setToolTip("Sszat\n" + status);
};


module.exports= {
	addListenersToIpcMain
};