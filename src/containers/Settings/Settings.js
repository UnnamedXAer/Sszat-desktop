import React, { useState } from 'react';
import classes from './Settings.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import ToggleSwitch from '../../components/UI/ToggleSwitch/ToggleSwitch';
import Button from '../../components/UI/Button/Button';

function getSavedSettings() {
    return require('../../config/defaultSettings.json');
}

const Settings = ({ cancel, complete }) => {

    const [settingsState, setSettingsState] = useState(getSavedSettings());

    const elementChangeHandler = (ev) => {
        const element = ev.target;
        const name = element.name;
        const elementType = element.type;
        let value;

        if (elementType === "checkbox") {
            value = element.checked;
        }
        else if (elementType === "button") {
            value = !settingsState[name];
        }
        else {
            value = element.value;
        }

        setSettingsState(prevSettings => {
            const updatedSettings = {...prevSettings, [name]: value}
            return updatedSettings;
        });
    }

    const cancelHandler = (ev) => {
        cancel();
    }

    const completeHandler = ev => {
        complete({...settingsState});
    }
    
    return (
        <Modal show={true}>
            <div className={classes.Settings}>
            <h2 className={classes.SettingsHeader}>Settings</h2>
                <div className={classes.OptionsContainer}>
                    <div className={classes.Option}>
                        <label>
                            Application Theme:
                            <Select
                                tabIndex="1000"
                                name="applicationTheme"
                                options={{
                                    "light": "Light",
                                    "dark": "Dark"
                                }}
                                value={settingsState.applicationTheme}
                                onChange={elementChangeHandler}
                            />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Messages font size:
                            <Select 
                                tabIndex="1001"
                                defaultValue="100" 
                                name="messageFontSize"
                                options={{
                                    "70": "70%",
                                    "80": "80%",
                                    "90": "90%",
                                    "100": "100%",
                                    "110": "110%",
                                    "120": "120%",
                                    "130": "130%"
                                }}
                                value={setSettingsState.messageFontSize}
                                onChange={elementChangeHandler}
                            />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Play Message Notification Sounds:
                            <ToggleSwitch
                                tabIndex="1002"
                                name="playMessageNotificationSound" 
                                checked={settingsState.playMessageNotificationSound} 
                                onChange={elementChangeHandler} 
                            />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Message Notification Sound Level:
                            <Input 
                                tabIndex="1003"
                                type="range" 
                                name="messageNotificationSoundLevel" 
                                onChange={elementChangeHandler} 
                                value={settingsState.messageNotificationSoundLevel} 
                            />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Show message Text in Notifications:
                            <ToggleSwitch 
                                disabled
                                tabIndex="1004"
                                name="showMessageTextInNotifications" 
                                checked={settingsState.showMessageTextInNotifications} 
                                onChange={elementChangeHandler} 
                            />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        Version: {"1.0.0"}
                    </div>
                </div>
                <div className={classes.Buttons}>
                    <Button tabIndex="104" btnType="Danger" clicked={cancelHandler} >Cancel</Button>
                    <Button tabIndex="103" btnType="Success"  clicked={completeHandler} >Ok</Button>
                </div>
            </div>
        </Modal>
    );
};

export default Settings;