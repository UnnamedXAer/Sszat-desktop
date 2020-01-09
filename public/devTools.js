const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const debug = require("debug");
const debugLog = debug("log");
const debugError = debug("error");

const openDevTools = (mainWindow) => {
	if (isDev) {
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
}

module.exports = {
	openDevTools
};