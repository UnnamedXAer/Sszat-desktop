const { Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const debug = require("debug");
const debugging = debug("debugging");

const createTrayMenu = (app, mainWindow, isQuiting) => {

	const trayMenu = Menu.buildFromTemplate([
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
			label: 'Show', click: () => {
				mainWindow.show();
				mainWindow.setSkipTaskbar(false);
			}
		},
		{
			label: 'Close to Tray', click: () => {
				mainWindow.hide();
				mainWindow.setSkipTaskbar(true);
			}
		},
		{
			label: 'Exit', click: () => {
				isQuiting = true;
				app.quit();
			}
		}
	]);

	return trayMenu;
};

const createTray = (app, mainWindow, isQuiting) => {
	const trayIconPath = `${path.join(__dirname, (isDev ? '/assets/logo.png' : '../build/assets/logo.png'))}`;
	const trayIcon = nativeImage.createFromPath(trayIconPath);
	const tray = new Tray(trayIcon);
	tray.setToolTip("Sszat");
	tray.setContextMenu(createTrayMenu(app, mainWindow, isQuiting));
	tray.addListener('double-click', (ev, rect) => {
		mainWindow.show();
		mainWindow.setSkipTaskbar(false);
	});

	return tray;
};

module.exports = {
	createTray,
	createTrayMenu
};