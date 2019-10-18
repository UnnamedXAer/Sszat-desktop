const os = require('os');
const statSync = require('fs').statSync;

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
        console.log(err);
    }

    return stat ? homeDownloads : "/tmp/";
}

const platformsDownloadFolderPath = {
    darwin: getDarwinDownloadFolderPath,
    linux: getLinuxDownloadFolderPath,
    win32: getWindowsDownloadFolderPath
};

module.exports = platformsDownloadFolderPath[os.platform()]();

// https://electronjs.org/docs/api/download-item