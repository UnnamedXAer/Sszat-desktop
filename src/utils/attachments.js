// const fileTypeIcons = {
//     "file": "File.ico",
//     "image" : "Image.ico",
//     ".doc": "Microsoft word.ico",
//     ".docx": "Microsoft word.ico",
//     ".bmp": "Microsoft paint.ico",
//     ".pdf": "pdf.ico",
//     ".txt": "text file.ico",
//     ".js": "code.ico",
//     ".jsx": "code.ico",
//     ".c": "code.ico",
//     ".cpp": "code.ico",
//     ".cs": "code.ico",
//     ".py": "code.ico",
//     ".html": "code.ico",
//     ".xml": "code.ico",
//     ".json": "code.ico",
//     ".sql": "code.ico",
//     ".env": "code.ico",
//     ".mp3": "music.ico",
//     ".wav": "music.ico"
// }

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

export const IMAGE_EXTENSIONS  = [
    '.jpeg', '.jpg', '.png', '.gif', '.svg', '.bmp'
];

export default function getFileTypeIcon(ext) {
    const icon = fileTypeIcons[ext];
    if (!icon)
        return fileTypeIcons["file"];
    return icon;
}
