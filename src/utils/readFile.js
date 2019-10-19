import { base64ToBuffer } from './attachments'; 
const fs = window.require('fs');
const { readFile, statSync } = fs;
// const stat = fs.stat;
/**
 * Read a file from path or File object
 * 
 * @param {{id, type, name}} newFile 
 */
export default function readSingleFile(isStringType, file, id) {
    return new Promise((resolve, reject) => {
        if (!isStringType) {
            const reader = new FileReader();
            reader.onload = ((id) => progressEvent => {
                const base64 = progressEvent.target.result;
                const data = base64ToBuffer(base64);
                resolve([data, id]);
            })(id);

            reader.onerror = ((id) => progressEvent => {
                // if could not read file remove it from files
                reject([progressEvent.target.error, id]);
            })(id);
            reader.readAsDataURL(file);
        }
        else {
            readFile(file, (err, data) => {
                if (err) 
                    reject([err, id]);
                resolve([data, id]);
            });
        }
    });
}

export function isFileTooBig(file) {
    let size; 
    if (typeof file === "string") {
        try {
            const stats = statSync(file);
            size = stats.size;
        }
        catch (err) {
            throw err; // todo
        }
    }
    else if (file instanceof File) {
        size = file.size;
    }
    else {
        throw new Error("Unrecognized file object.");
    }
    return size > 26214400;
}