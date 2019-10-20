require('dotenv').config();
const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const debug = require("debug");
const debugError = debug("error");
const debugLog = debug("log");
const debugging = debug("debug");
// const findNextName = require('./utils/findNextName');
const findNextName = require('find-next-file-name');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		minWidth: 595, /* min width required when send options are expanded */
		height: 500,
		minHeight: 280 + (20/* because of chromium menu height */),
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	const appUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
	debugLog("App url: %s", appUrl)
	mainWindow.loadURL(appUrl);
	if (isDev) {
		// Open the DevTools.
		BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
		mainWindow.webContents.openDevTools();
	}

	ipcMain.on("download-attachment", (ev, payload) => {
		const downloadDirectory = require('../src/utils/downloadLocation');
		const fileName = payload.file.name;
		const nextName = findNextName(downloadDirectory, fileName);
		const pathname = `${downloadDirectory}/${nextName}`;

		debugLog("About to save file: %s", pathname);
		const writeStream = new fs.createWriteStream(pathname);
		writeStream.on("finish", () => {
			debugLog("Saving fishished: %s", pathname);
			debugging("File id: %s", payload.file.id);
			ev.sender.send("attachment-download-end", {
				fileId: payload.file.id,
				error: fileSaveError
			});
		});
		writeStream.on("error", (err) => {
			debugError("File (%s) saving error: %s",pathname, err);
			fileSaveError = {
				message: err.message
			}
		});

		let fileSaveError;

		writeStream.write(payload.file.data);
		writeStream.end();
	});

	mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});