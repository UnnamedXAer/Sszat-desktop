require('dotenv').config();
const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const dl = require('../src/utils/downloadLocation');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    minWidth: 595, /* min width required when send options are expanded */
    height: 500,
    minHeight: 280+(20/* because of chromium menu height */),
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
    mainWindow.webContents.openDevTools();
  }
  ipcMain.on("download-attachment", (ev, payload) => {
    console.log("payload", payload);
    const writeStream = new fs.WriteStream(`${dl}/${payload.file.name}`)
    writeStream.on("finish", (res) => {
      console.log('saving fishished', res);
    });
    writeStream.on("err", (err) => {
      console.log("file saving error", err);
    });

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