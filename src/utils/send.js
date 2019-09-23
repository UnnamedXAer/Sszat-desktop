const linkify = require('linkify-it')();

/// Get the text entered by user and convert it to message parts.
export function textToMessageParts(text) {
    let parts = [];

    let tmpParts = [];

    // split text on new line characters.
    tmpParts = text.split('\n').map((textLine) => ({
        type: "unformatted",
        content: textLine
    }));

    let len = tmpParts.length;
    // add new-line parts between real lines
    for (let i = 0; i < len; i++) {
        parts.push(tmpParts[i]);
        
        if (i+1 < len) {
            parts.push({
                type: 'new-line'
            });
        }
    }
    
    // check lines for: urls, ...
    tmpParts = [];
    len = parts.length;
    for (let i = 0; i < len; i++) {
        const line = parts[i];

        // skip new lines
        if (line.type === "new-line") {   
            tmpParts.push(line);   
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
            
            tmpParts.push(...lineParts);
        }
        else {
            // Whole line as a one message part
            tmpParts.push(line);
        }
    } // end of looping through lines.

    // if all checkings were done change unformatted to default = "text"
    parts = tmpParts.map(x => ({...x, type: x.type === 'unformatted' ? "text" : x.type}));

    return parts;
}