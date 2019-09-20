        // console.log(clipboard);
        var content = null;
        try { 
            content = clipboard.readText(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('text', content);
        try { 
            content = clipboard.readHTML(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('html', content);
        try { 
            content = clipboard.readRTF(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('rtf', content);
        try { 
            content = clipboard.readImage(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('Image', content);
        try { 
            content = clipboard.readBuffer(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('Buffer', content);
        try { 
            content = clipboard.readBookmark(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('Bookmark', content);
        try { 
            content = clipboard.readFindText(); 
        } 
        catch (err) { 
            content = err.toString() 
        }
        console.log('FindText', content);

        try { 
            content = clipboard.readBuffer('FileName'); } 
        catch (err) { 
            content = err.toString() 
        }
        console.log("fileName:  ", content);
        try { 
            content = clipboard.readBuffer('FileName').toString(); } 
        catch (err) { 
            content = err.toString() 
        }
        console.log("fileName.ToString:  ", content);

        console.log('Paste handler');