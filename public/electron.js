require('dotenv').config();
const { BrowserWindow, app } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const debug = require("debug");
// const debugError = debug("error");
const debugLog = debug("log");
// const debugging = debug("debugging");
const { createTray } = require('./electronTray');
const { openDevTools } = require('./devTools');
const { addListenersToIpcMain } = require('./electronListeners');

let mainWindow;
let tray;
let isQuiting;

/* if app does not start delete folder: C:\Users\kteresz\AppData\Roaming\{app-name-from-package.json} */
/* There is something with closing manually devTools */

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		minWidth: 595, /* min width required when send options are expanded */
		height: 300,//500,
		minHeight: 280 + (20/* because of chromium menu height */),
		useContentSize: true,
		backgroundColor: "#2e2c29",
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		}
	});

	const appUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
	debugLog("App url: %s", appUrl)
	mainWindow.loadURL(appUrl);
	
	openDevTools(mainWindow);
	addListenersToIpcMain(mainWindow, tray);


	mainWindow.on('closed', () => mainWindow = null);
	mainWindow.on('close', (ev) => {
		if (!isQuiting) {
			ev.preventDefault();
			mainWindow.hide();
			ev.returnValue = false;
		}
	});

	tray = createTray(app, mainWindow, isQuiting);
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

