import EMOTICONS_LIST from './emoticons';

const linkify = require('linkify-it')();

export default class TextToPartsConverter {
    constructor(text, codeSnippets) {
        this.messageText = text;
        this.codeSnippets = codeSnippets;
        this.parts = [];
    }

    getParts() {
        return this.parts;
    }

    convertTextToParts() {
    
        this.splitTextToPartOnNewLines();
        this.addNewLinePartsBetweenLines();
        this.makeUrlsSeparateParts();
        this.makeEmoticonMarksSeparateParts();
    
        this.parts = this.parts.map(x => ({...x, type: x.type === 'unformatted' ? "text" : x.type}));

        this.appendCodeSnippetsToParts();
    
        return this.parts;
    }
    
    splitTextToPartOnNewLines() {
        this.parts = this.messageText.split('\n').map((textLine) => ({
            type: "unformatted",
            content: textLine
        }));
    }
    
    addNewLinePartsBetweenLines() {
        const lineParts = this.parts;
        const partsWithNewLineParts = []
        const len = lineParts.length;
        // add new-line parts between real lines
        for (let i = 0; i < len; i++) {
            partsWithNewLineParts.push(lineParts[i]);
            
            if (i+1 < len) {
                partsWithNewLineParts.push({
                    type: 'new-line'
                });
            }
        }
    
        this.parts = partsWithNewLineParts;
    }
    
    makeUrlsSeparateParts() {
        const partsWithTextUrls = this.parts
        const partsWithUrlParts = [];
        const len = partsWithTextUrls.length;
        for (let i = 0; i < len; i++) {
            const line = partsWithTextUrls[i];
    
            // skip new lines
            if (line.type === "new-line") {   
                partsWithUrlParts.push(line);   
                continue;
            }
    
            // check for urls in line
            const urls = linkify.match(line.content);
            if (urls) {
                const lineParts = [];
                for (let l = 0; l < urls.length; l++) {
    
                    const startIndex = urls[l-1] ? urls[l-1].lastIndex : 0;
    
                    // setting as 'unformatted' in case the part will need additional checking
                    lineParts.push({ // get text before current url
                        type: 'unformatted',
                        content: line.content.substring(startIndex, urls[l].index)
                    });
    
                    lineParts.push({
                        type: 'url',
                        content: urls[l].raw,
                        url: urls[l].url
                    });
    
                    if (!urls[l+1] && line.content.substring(urls[l].lastIndex) !== "") { // get text placed after last url if not empty
                        lineParts.push({
                            type: 'unformatted',
                            content: line.content.substring(urls[l].lastIndex)
                        });
                    }
                } // and of urls loop
                
                partsWithUrlParts.push(...lineParts);
            }
            else {
                // Whole line as a one message part
                partsWithUrlParts.push(line);
            }
        } // end of looping through lines.
    
        this.parts = partsWithUrlParts;
    }
    
    makeEmoticonMarksSeparateParts() {
        const partsWithEmoticonsMark = this.parts;
        const len = partsWithEmoticonsMark.length;
        const partsWithEmoticonsParts = [];
        for (let i = 0; i< len; i++) {
            if (partsWithEmoticonsMark[i].type !== "unformatted") {
                partsWithEmoticonsParts.push(partsWithEmoticonsMark[i]);
                continue;
            }
            const partsWithEmoticons = this.checkForEmoticonsInUnformattedPart(partsWithEmoticonsMark[i]);
            partsWithEmoticonsParts.push(...partsWithEmoticons);
        }
    
        this.parts = partsWithEmoticonsParts;
    }
    
    checkForEmoticonsInUnformattedPart(part) {
        const partsWithEmoticonsParts = [];
        const partText = part.content;

        let emoticonIndexStart = partText.indexOf("<");
        let emoticonIndexEnd = partText.indexOf("/>", emoticonIndexStart);
        let prevEmoticonIndexEnd = -1;
        // todo -> <<smile/> -> do not work
        while ( (emoticonIndexStart+1) > 0 && emoticonIndexEnd > emoticonIndexStart) {
    
            const emoticonName = partText.substring(emoticonIndexStart+1, emoticonIndexEnd).trim();
            if (EMOTICONS_LIST.includes(emoticonName)) {
                partsWithEmoticonsParts.push({
                    type: "unformatted",
                    content: partText.substring(prevEmoticonIndexEnd+2, emoticonIndexStart)
                });
                partsWithEmoticonsParts.push({
                    type: "emoticon",
                    iconName: emoticonName
                });
            }
            else {
                partsWithEmoticonsParts.push({
                    type: "unformatted",
                    content: partText.substring(prevEmoticonIndexEnd+2, emoticonIndexEnd+2)
                });
            }
            prevEmoticonIndexEnd = emoticonIndexEnd;
            emoticonIndexStart = partText.indexOf("<", prevEmoticonIndexEnd+2);
            emoticonIndexEnd = partText.indexOf("/>", prevEmoticonIndexEnd+2);
        };
        partsWithEmoticonsParts.push({
            type: "unformatted",
            content: partText.substring(prevEmoticonIndexEnd+2)
        });
        return partsWithEmoticonsParts;
    }

    appendCodeSnippetsToParts() {
        const snippetsParts = this.codeSnippets.map(snipped => ({
            type: 'code',
            content: snipped.code,
            language: snipped.language,
            fileName: snipped.fileName
        }));

        this.parts.push(...snippetsParts);
    }
}