export function logFileError(error) {
    if (error != null) {
        switch (error.code) {
            case error.ENCODING_ERR:
                console.error("Encoding error!");
                break;

            case error.NOT_FOUND_ERR:
                console.error("File not found!");
                break;

            case error.NOT_READABLE_ERR:
                console.error("File could not be read!");
                break;

            case error.SECURITY_ERR:
                console.error("Security issue with file!");
                break;

            default:
                console.error("I have no idea what's wrong!");
        }
    }
    else {
        console.error("I have no idea what's wrong! No error was specified.");
    }
} 