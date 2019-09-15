import React, { useState } from 'react';
import classes from './AddCodeSnippet.module.css';
import Button from '../../../../components/UI/Button/Button';
const readFileSync = window.require('fs').readFileSync;

const AddCodeSnippet = ({ supportedLanguages, onExit }) => {
    const languages = ["Plain Text"].concat(supportedLanguages);

    // console.log(languages)
    const [language, setLanguage] = useState(() => {
        const defaultSnippedLang = null; //localStorage.getItem('default-snipped-lang');
        if (defaultSnippedLang) {
            return defaultSnippedLang;
        }
        // return languages[100];
        return 'javascript'
    });
    const [fileName, setFileName] = useState("electron.js");
    
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
            language: language,
            fileName: fileName,
            code: code
        }
        onExit(snippet);
    }

    const languageOptions = languages.map(x => (
        <option key={x} value={x}>{x}</option>
    ));

    return (
        <div className={classes.AddCodeSnippet}>
            <h3>Create code snippet</h3>
            <div className={classes.InputsContainer}>
                <label className={classes.FileNameLabel} htmlFor="filename">
                    <input
                        name="fileName"
                        className={classes.FileName} 
                        type="text" 
                        placeholder="file name eg. index.js"
                        onChange={fileNameChangeHandler}
                        value={fileName}
                        />
                </label>
                <label className={classes.LanguageLabel} htmlFor="language">
                    <select 
                        name="language"
                        className={classes.Language}
                        onChange={languageChangeHandler} 
                        value={language} >
                        {languageOptions}
                    </select>
                </label>
            </div>
            <textarea 
                name="code"
                className={classes.Code} 
                onChange={codeChangeHandler} 
                value={code}
                rows="5"
            ></textarea>
            <div className={classes.Buttons}>
                <Button btnType="Danger" clicked={cancelHandler} >Cancel</Button>
                <Button btnType="Success"  clicked={completeHandler} >Ok</Button>
            </div>
        </div>
    );
};

export default AddCodeSnippet;

