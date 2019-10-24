require('dotenv').config();
const findNextName = require('find-next-file-name');
const fs = require('fs');
const debug = require("debug");
const debugging = debug("debugging");
const debugLog = debug("log");
const debugError = debug("error");


module.exports.saveAttachment = (file, directory) => {
	return new Promise((resolve, reject) => {
		let fileSaveError;

		const downloadDirectory = directory || require('../../src/utils/downloadLocation');
		const fileName = file.name;
		const nextName = findNextName(downloadDirectory, fileName);
		const pathname = `${downloadDirectory}/${nextName}`;

		debugLog("About to save file: %s", pathname);
		const writeStream = new fs.createWriteStream(null/*pathname*/);
		writeStream.on("finish", () => {
			debugLog("Saving completed: %s", pathname);
			debugging("File id: %s", file.id);

			if (fileSaveError) {
				// reject([{error: fileSaveError, fileId: file.id}]);
				debugError("before reject error: %O", fileSaveError);
				reject(fileSaveError);
			}
			else {
				resolve(file.id);
			}
		});
		writeStream.on("error", (err) => {
			debugError("File (%s) saving error: %s", pathname, err);
			// fileSaveError = {
			// 	message: err.message
			// }
			fileSaveError = {...err};
		});

		writeStream.write(file.data);
		writeStream.end();
	});
}