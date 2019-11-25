import { getBase64dataType, getFileTypeIcon } from './attachments';


export function getImageFileTypeImgSrc(file) {

    // if file is image display it
    const base64data = file.data.toString('base64');
    const base64dataType = getBase64dataType(file.ext);
    const imgSrc = `data:${base64dataType};base64,${base64data}`;
    
    return imgSrc;
}

export function getNotImageFileTypeImgSrc(file) {
        const fileIcon = getFileTypeIcon(file.ext);
        let imgSrc = null;
        try {
            imgSrc = require(`../assets/images/fileTypesThumb/svg/${fileIcon}.svg`);
        }
        catch (err) {
            console.error(err);
        }

    return imgSrc;
}