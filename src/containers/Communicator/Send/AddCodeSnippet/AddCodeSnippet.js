import React, { useState } from 'react';
import classes from './AddCodeSnippet.module.css';

const AddCodeSnippet = ({ supportedLanguages, onExit }) => {
    console.log(supportedLanguages);
    const languages = ["Plain Text"].concat(supportedLanguages);

    const [language, setLanguage] = useState(() => {
        const defaultSnippedLang = null; //localStorage.getItem('default-snipped-lang');
        if (defaultSnippedLang) {
            return defaultSnippedLang;
        }
        return languages[0];
    });
    const [fileName, setFileName] = useState("");
    const [code, setCode] = useState("");

    const languageChangeHandler = (ev) => {

        const selectedLanguage = ev.target.value;
        // localStorage.setItem('default-snipped-lang', selectedLanguage);
        setLanguage(selectedLanguage);
    };

    const fileNameChangeHandler = (ev) => {
        setFileName(ev.target.value);
    };

    const codeChangeHandler = (ev) => {
        setCode(ev.target.value);
    }

    const cancelHandler = (ev) => {
        onExit(false);
    }

    const completeHandler = ev => {

        const snippet = {
            language: language.key,
            fileName: fileName,
            code: code
        }
        onExit(true, snippet);
    }

    const languageOptions = languages.map(x => (
        <option key={x} value={x}>{x}</option>
    ));

    return (
        <div className={classes.AddCodeSnippet}>
            <h3>Create code snippet</h3>
            <div>
                <div>
                    <input
                        className={classes.FileName} 
                        type="text" 
                        placeholder="file name eg. index.js"
                        onChange={fileNameChangeHandler}
                        value={fileName}
                        />
                </div>
                <div>
                    <select 
                        className={classes.Language}
                        onChange={languageChangeHandler} 
                        value={language} >
                        {languageOptions}
                    </select>
                </div>
            </div>
            <code>1234</code>
            <div>
                <textarea className={classes.Code} onChange={codeChangeHandler} value={code}></textarea>
            </div>
            <div>
                <button className={[classes.Button, classes.Cancel]} onClick={cancelHandler} >Cancel</button>
                <button className={[classes.Button, classes.Complete]} onClick={completeHandler} >Ok</button>
            </div>
        </div>
    );
};

export default AddCodeSnippet;

