const fileTypeIcons = {
    "file": "File.ico",
    "image" : "Image.ico",
    ".doc": "Microsoft word.ico",
    ".docx": "Microsoft word.ico",
    ".bmp": "Microsoft paint.ico",
    ".pdf": "pdf.ico",
    ".txt": "text file.ico",
    ".js": "code.ico",
    ".jsx": "code.ico",
    ".c": "code.ico",
    ".cpp": "code.ico",
    ".cs": "code.ico",
    ".py": "code.ico",
    ".html": "code.ico",
    ".xml": "code.ico",
    ".json": "code.ico",
    ".sql": "code.ico",
    ".env": "code.ico",
    ".mp3": "music.ico",
    ".wav": "music.ico"
}

export const IMAGE_EXTENSIONS  = [
    '.jpeg', '.jpg', '.png', '.gif'
];

export default function getFileTypeIcon(ext) {
    const icon = fileTypeIcons[ext];
    if (!icon)
        return fileTypeIcons["file"];
    return icon;
}
