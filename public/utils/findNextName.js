const { existsSync } = require('fs');
const { resolve, parse } = require('path');

module.exports = function (directory, fileName) {
    const parsedfileName = parse(fileName);
    let name = parsedfileName.name;
    const ext = parsedfileName.ext;
    let i = 1;

    // const lastOpenBracketPos = name.lastIndexOf("(");
    // if (lastOpenBracketPos !== -1) {
    //     const lastCloseBracketPos = name.lastIndexOf(")");
    //     if (lastCloseBracketPos > lastOpenBracketPos && lastCloseBracketPos === name.length-1) {
    //         const bracketsWithText = name.substring(lastOpenBracketPos, lastCloseBracketPos+1);
    //         if ((/\(\d+\)/).test(bracketsWithText)) {
    //             i = (+bracketsWithText.substr(1, bracketsWithText.length-2)) + 1;
    //             name = name.substring(0, lastOpenBracketPos-1);
    //         }
    //     }
    // }

    let currentFileName = fileName;
    let nextPathName = resolve(directory, currentFileName);
    while (existsSync(nextPathName)) {
        currentFileName = `${name} (${i})${ext}`;
        nextPathName = resolve(directory, currentFileName);
        i++;
    }

    return currentFileName;
};