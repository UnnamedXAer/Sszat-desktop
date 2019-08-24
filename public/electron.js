// https://www.codementor.io/randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer
require('dotenv').config();
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
console.log(1);
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
console.log(2);


function createWindow() {
console.log(4);

    mainWindow = new BrowserWindow({width: 800, height: 450});
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    console.log('createWindow - isDev ',isDev);
    if (isDev) {
        // Open DevTools.
        BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => {console.log('closed');mainWindow = null;});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        console.log('app.quit()');
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        console.log('activated - createWindow()');
        createWindow();
    }
});
console.log(3);
