const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const debug = require("debug");
const debugError = debug("error");
const debugLog = debug("log");
const debugging = debug("debugging");

const getThirdPartAuthHandler = (mainWindow) => async (ev, payload) => {
	const { provider } = payload;
	if (!provider) {
		debugError(`[ Auth ] - provider is not specified. Payload: %O`, payload);
		ev.sender.send("signIn3rdPart-completed", {
			message: `${payload.provider} - Wrong provider: "${payload ? payload.provider : undefined}"`
		});
		return;
	}
	const pos = await getAuthWindowPosition();
	debugLog(`[ Auth: ${payload.provider}] about to create authWindow`);
	let authWindow = new BrowserWindow({
		parent: mainWindow,
		modal: true,
		x: pos.x,
		y: pos.y,
		backgroundColor: '#2e2c29',
		title: payload.provider,
		width: 660,
		minWidth: 595,
		height: 775,
		minHeight: 280 + (20),
		useContentSize: true,
		show: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	// authWindow.webContents.openDevTools();

	addEventListenersToAuthWindow(authWindow, ev.sender, provider);

	loadUrlAndShow(authWindow, provider);
};

const getAuthWindowPosition = async () => {
	const screenResolution = await require('./utils/screenResolution');
	const posX = (screenResolution ? screenResolution.currentResX - 700 : null);
	const posY = (screenResolution ? (screenResolution.currentResY + 780 + 1.5) : null);
	debugLog("screen resolution: %O \nauthWindow will be at: posX -> %s, posY -> %s", screenResolution, posX, posY);
	return {
		x: posX,
		y: posY
	};
};

const addEventListenersToAuthWindow = (authWindow, sender, provider) => {

	authWindow.on('close', (closeEv) => {
		// debugging("authWindow close, closeEv: %O", closeEv);
		debugLog("authWindow close");
		sender.send("signIn3rdPart-completed", {
			message: `${provider} - Auth popup is about to close.`
		});
	});

	authWindow.on('closed', () => {
		debugging("authWindow closed");
		authWindow = null;
	});
}

const loadUrlAndShow = (authWindow, provider) => {
	const apiAuthUrlForProvider = `${process.env.REACT_APP_API_URL}auth/${provider}`;
	debugLog(`authUrl: ${apiAuthUrlForProvider}`);

	const authPageURL = (isDev ?
		'http://localhost:3000/authBy3rdPart.html'
		: `file://${path.join(__dirname, '../build/authBy3rdPart.html')}`) +
		`?providerApiPath=${apiAuthUrlForProvider}`;

	authWindow.loadURL(authPageURL);
	authWindow.show();
}

module.exports = {
	getThirdPartAuthHandler
};