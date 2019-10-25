require('dotenv').config();
const { BrowserWindow, app, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const debug = require("debug");
const debugError = debug("error");
const debugLog = debug("log");
const debugging = debug("debugging");
const { saveAttachment } = require("./utils/attachments");

app.setUserTasks([
	{
		program: process.execPath,
		arguments: '--new-window',
		iconPath: process.execPath,
		iconIndex: 0,
		title: 'New "sszat" Window',
		description: 'Create the new sszat window'
	}
]);

let mainWindow;
let tray;
let isQuiting;

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
		saveAttachment(payload.file)
			.then(res => {
				debugging("download-attachment.then res: %O",res);
				ev.sender.send("attachment-download-end", {
					fileId: res
				});
			})
			.catch(err => {
				console.log('err', err)
				debugging("download-attachment.catch err: %s", err.message);
				ev.sender.send("attachment-download-end", {
					fileId: payload.file.id,
					error: err.message});
			});
	});

	mainWindow.on('closed', () => mainWindow = null);
	mainWindow.on('close', (ev) => {
		if (!isQuiting) {
			ev.preventDefault();
			mainWindow.hide();
			ev.returnValue = false;
		}
	});

	const trayIcon = nativeImage.createFromPath(`${path.join(__dirname, (isDev ? '/assets/logo.png' : '../build/assets/logo.png'))}`);
	tray = new Tray(trayIcon);
	tray.setToolTip("Sszat\nOnline.");

	tray.setContextMenu(trayMenu);

	tray.addListener('double-click', (ev, rect) => {
		mainWindow.show();
	});
}

app.on('ready', createWindow);

app.on('before-quit', function () {
	isQuiting = true;
});

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

const trayMenu = Menu.buildFromTemplate([
	{
		label: 'Open', click: () => {
			mainWindow.show();
		}
	},
	{
		label: `Toggle "Always on Top"`, click: () => {
			const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
			mainWindow.setAlwaysOnTop(!isAlwaysOnTop);
		}
	},
	{
		label: 'Exit', click: () => {
			isQuiting = true;
			app.quit();
		}
	}
]);