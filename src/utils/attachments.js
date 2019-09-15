const thumName = {
    "file": "file.ico",
    "image" : 'Image.ico',
    "microsoft-word": "Microsoft word.ico",
    "microsoft-paint": "Microsoft paint.ico",
}

export default function (ext) {
    // todo some usefull logic
    return thumName["file"];
}