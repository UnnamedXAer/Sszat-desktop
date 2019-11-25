const os = require('os');
const statSync = require('fs').statSync;
const debugError = require("debug")("error");

function getWindowsDownloadFolderPath() {
    return `${process.env.USERPROFILE}/Downloads`;
}

function getDarwinDownloadFolderPath() {
    return `${process.env.HOME}/Downloads`;
}

function getLinuxDownloadFolderPath() {
    let stat;
    const homeDownloads = `${process.env.HOME}/Downloads`;
    try {
        //if no error then folder exists
        stat = statSync(homeDownloads);
    } catch (err) {
		debugError("[getLinuxDownloadFolderPath], err: %O", err);
    }

    return stat ? homeDownloads : "/tmp/";
}

const platformsDownloadFolderPath = {
    darwin: getDarwinDownloadFolderPath,
    linux: getLinuxDownloadFolderPath,
    win32: getWindowsDownloadFolderPath
};

module.exports = platformsDownloadFolderPath[os.platform()]();