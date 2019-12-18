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

/* if app does not start delete folder: C:\Users\kteresz\AppData\Roaming\{app-name-from-package.json} */
/* There is something with closing manually devTools */

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 595,//900,
		minWidth: 595, /* min width required when send options are expanded */
		height: 300,//500,
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
		try {
			debugLog("about to add devtools");
			BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
			BrowserWindow.addDevToolsExtension(process.env.REDUX_DEV_TOOLS_PATH);
		}
		catch (err) {
			debugError("Error when adding devtools: %O", err);
		}
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
				debugError('err %O', err)
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

	ipcMain.on("signIn3rdPart", (ev, payload) => {
		if (!payload || !payload.provider) {
			debugError(`[ Auth ] - provider is not specified. Payload: %O`, payload);
			ev.sender.send("signIn3rdPart-completed", { 
				message: `${payload.provider} - Wrong provider: "${payload ? payload.provider : undefined}"` 
			});
			return;
		}
		debugLog(`[ Auth: ${payload.provider}] about to create authWindow`);
		let authWindow = new BrowserWindow({
			title: payload.provider,
			width: 660,
			minWidth: 595,
			height: 775,
			minHeight: 280 + (20),
			useContentSize: true,
			show: false,
			webPreferences: {
				nodeIntegration: true
			}});
		authWindow.webContents.openDevTools();
		
		authWindow.on('close', (closeEv) => {
			debugging("authWindow close, closeEv: %O", closeEv);
			debugLog("authWindow close");
			ev.sender.send("signIn3rdPart-completed", { 
				message: `${payload.provider} - Auth popup is about to close.` 
			});
		});

		authWindow.on('closed', () => {
			debugging("authWindow closed");
			authWindow = null;
		});

		const apiAuthUrlForProvider = `${process.env.REACT_APP_API_URL}auth/${payload.provider}`;
		debugLog(`authUrl: ${apiAuthUrlForProvider}`);

		const authPageURL = (isDev ? 
			'http://localhost:3000/authBy3rdPart.html' 
			: `file://${path.join(__dirname, '../build/authBy3rdPart.html')}`) +
			`?providerApiPath=${apiAuthUrlForProvider}`;

		authWindow.loadURL(authPageURL);
		authWindow.show();
	});

	mainWindow.on('closed', () => mainWindow = null);
	mainWindow.on('close', (ev) => {
		if (!isQuiting) {
			ev.preventDefault();
			mainWindow.hide();
			ev.returnValue = false;
		}
	});

	const trayIconPath = `${path.join(__dirname, (isDev ? '/assets/logo.png' : '../build/assets/logo.png'))}`;
	const trayIcon = nativeImage.createFromPath(trayIconPath);
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
		label: 'Sign Out', click: () => {
			debugging("About to emit %s", "signOut");
			mainWindow.webContents.send("signOut");
		}
	},
	{
		label: 'Exit', click: () => {
			isQuiting = true;
			app.quit();
		}
	}
]);