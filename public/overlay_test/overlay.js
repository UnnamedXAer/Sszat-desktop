const { ipcMain, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const debug = require("debug");
const debugError = debug("error");
const debugLog = debug("log");
const debugging = debug("debugging");

let overlayWindow = null;
let isOverlayMode = false;
const toggleOverlayMode = (mainWindow) => () => {
	debugging("--OVERLAY-- Toggled Overlay widow. New state will be: %s", !isOverlayMode);
	if (!isOverlayMode) {
		if (!overlayWindow) {
			overlayWindow = new BrowserWindow({
				width: 60,
				height: 60,
				frame: false,
				resizable: false,
				transparent: true,
				show: false,
				// movable: false,
				minimizable: false,
				maximizable: false,
				alwaysOnTop: true,
				skipTaskbar: true,
				webPreferences: {
					nodeIntegration: true
				}
			});

			ipcMain.on("overlay-clicked", () => {
				debugging("--OVERLAY-- in ipcMain => overlay-clicked event");
				overlayWindow.hide();
				mainWindow.show();
				mainWindow.focus();
				mainWindow.flashFrame(true);
				setTimeout(() => {
					mainWindow.flashFrame(false);
				}, 1000);
			})
			const overlayUrl = isDev ? path.join(__dirname, 'overlay.html') 
				: `file://${path.join(__dirname, '../build/overlay.html')}`;
			debugLog("--OVERLAY-- url: %s", overlayUrl);
			overlayWindow.loadURL(overlayUrl)
				.then(res => {
					debugging("--OVERLAY-- loadUR(then)");
					overlayWindow.show();
					mainWindow.hide();
				})
				.catch(err => {
					debugError("--OVERLAY-- loadUR error: ", err);
					overlayWindow.close();
					overlayWindow = null;
					mainWindow.show();
				});
			// overlayWindow.webContents.openDevTools();
		}
		else {
			mainWindow.hide();
			overlayWindow.show();
		}
	}
	else {
		overlayWindow.hide();
		mainWindow.show();
	}

	// const trayIconPath = `${path.join(__dirname, (isDev ? '/assets/logo.png' : '../build/assets/logo.png'))}`;
	// const trayIcon = nativeImage.createFromPath(trayIconPath);
	// tray.displayBalloon({
		
	// 	icon: trayIcon,
	// 	title: "sszat",
	// 	content: `Overlay mode ${!isOverlayMode ? "ON" : "OFF"}.`
	// });

	isOverlayMode = !isOverlayMode;
};

module.exports = {
	toggleOverlayMode
};