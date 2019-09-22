import { base64ToBuffer } from './attachments'; 
const fs = window.require('fs');
const  readFile = fs.readFile;
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
            })
        }
    });
}