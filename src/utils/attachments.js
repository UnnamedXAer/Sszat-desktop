import uuid from 'uuid/v1';
const { extname } = require('path');
const { dialog } = window.require('electron').remote;

const fileTypeIcons = {
    '': "file",
    '.': "file",
    '.ai': 'ai',
    '.avi': "avi",
    '.css': "css",
    '.csv': "csv",
    '.dbf': "dbf",
    '.doc': "doc",
    '.dreamweaver': "dreamweaver",
    '.dwg': "dwg",
    '.exe': "exe",
    '.file': "file",
    '.fla': "fla",
    '.fireworks': "fireworks",
    '.bridge': "bridge",
    '.audition': "audition",
    '.flash': "flash",
    '.html': "html",
    '.illustrator': "illustrator",
    '.indesign': "indesign",
    '.iso': "iso",
    '.js': "javascript",
    '.javascript': "javascript",
    '.jpg': "jpg",
    '.json': "json-file",
    '.mp3': "mp3",
    '.mp4': "mp4",
    '.pdf': "pdf",
    '.photoshop': "photoshop",
    '.png': "png",
    '.ppt': "ppt",
    '.prelude': "prelude",
    '.premiere': "premiere",
    '.psd': "psd",
    '.rtg': "rtf",
    '.search': "search",
    '.svg': "svg",
    '.txt': "txt",
    '.xls': "xls",
    '.xml': "xml",
    '.zip': "zip",
    '.jpeg' :"jpg", 
    '.gif': "file", 
    '.bmp': "file",
}

export const imagesExtBase64dataType = {
    'jpg': 'image/jpeg',
    'png': 'image/png',
    '.gif': 'image/gif',
    '.art': 'image/x-jg',
    '.bm': 'image/bmp',
    '.bmp': 'image/bmp',
    '.dwg': 'image/vnd.dwg',
    '.dxf': 'image/vnd.dwg',
    '.fif': 'image/fif',
    '.flo': 'image/florian',
    '.fpx': 'image/vnd.fpx',
    '.g3': 'image/g3fax',
    '.ico': 'image/x-icon',
    '.ief': 'image/ief',
    '.iefs': 'image/ief',
    '.jfif': 'image/jpeg',
    '.jfif-tbnl': 'image/jpeg',
    '.jpe': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.jps': 'image/x-jps',
    '.jut': 'image/jutvision',
    '.mcf': 'image/vasa',
    '.nap': 'image/naplps',
    '.naplps': 'image/naplps',
    '.nif': 'image/x-niff',
    '.niff': 'image/x-niff',
    '.pbm': 'image/x-portable-bitmap',
    '.pct': 'image/x-pict',
    '.pcx': 'image/x-pcx',
    '.pgm': 'image/x-portable-graymap',
    '.pic': 'image/pict',
    '.pict': 'image/pict',
    '.pm': 'image/x-xpixmap',
    '.png': 'image/png',
    '.pnm': 'image/x-portable-anymap',
    '.ppm': 'image/x-portable-pixmap',
    '.qif': 'image/x-quicktime',
    '.qti': 'image/x-quicktime',
    '.qtif': 'image/x-quicktime',
    '.ras': 'image/cmu-raster',
    '.rast': 'image/cmu-raster',
    '.rf': 'image/vnd.rn-realflash',
    '.rgb': 'image/x-rgb',
    '.rp': 'image/vnd.rn-realpix',
    '.svf': 'image/x-dwg',
    '.tif': 'image/tiff',
    '.tiff': 'image/tiff',
    '.turbot': 'image/florian',
    '.wbmp': 'image/vnd.wap.wbmp',
    '.xbm': 'image/x-xbitmap',
    '.xif': 'image/vnd.xiff',
    '.xpm': 'image/x-xpixmap',
    '.x-png': 'image/png',
    '.xwd': 'image/x-xwd',
    '.svg': 'image/svg+xml'
};

export function getBase64dataType(ext) {
    return imagesExtBase64dataType[ext];
}

export function getFileTypeIcon(ext) {
    const icon = fileTypeIcons[ext];
    if (!icon)
        return fileTypeIcons[""];
    return icon;
}

export function getFileExtFromBase64(base64) {
    return "."+base64.split(";")[0].substring(("data:image/").length).split("/")[0];
}

export function base64ToBuffer(base64) {
    // find index of data type end
    const indexOfData = base64.indexOf(";base64,")+((";base64,").length);
                
    // make buffer only from (we send all data as buffer then convert it to display)
    const data = Buffer.from(base64.substring(indexOfData), 'base64');

    return data;
}

export function parseDataTransferText(dataTransfer, dataTransferText) {

    const results = {};

    if (dataTransferText) {
        // check if data is an img
        // eslint-disable-next-line
        if (dataTransferText.match(/data:image\/([a-zA-Z]*);base64,([^\"]*)/)) {

            let fileName;
            let ext;
            const dataTransferHTML = dataTransfer.getData("text/html");
            if (dataTransferHTML) {
                const altStartIndex = dataTransferHTML.indexOf("alt=\"");
                const altTextEndIndex = dataTransferHTML.indexOf("\"", altStartIndex+5);
                fileName = dataTransferHTML.substring(altStartIndex+5, altTextEndIndex);
                if (fileName && fileName.lastIndexOf(".") !== -1) {
                    ext= extname(fileName);
                } 
                else {
                    ext= getFileExtFromBase64(dataTransferText);
                }
            }
            else {
                ext= getFileExtFromBase64(dataTransferText);
                fileName = "file_"+Date.now()+ext;
            }

            const newFile = {
                id: uuid(),
                ext: ext,
                name: fileName,
                path: null,
                data: base64ToBuffer(dataTransferText)
            };
            results.file = newFile;
        }
        // make other checks
    }
    return results;
}

export function openFilesDialog() {
    let selectedFilesPath;
    try {
        // On Windows and Linux an open dialog can not be both a file selector and a directory selector, 
        // so if you set properties to ['openFile', 'openDirectory'] on these platforms, a directory selector will be shown.
        selectedFilesPath = dialog.showOpenDialogSync({ properties: ['openFile', "openFile", 'multiSelections'] });
    }
    catch (err) {
        alert("ERROR: "+err.message)
        console.error(err);
    }
    return selectedFilesPath;  
}