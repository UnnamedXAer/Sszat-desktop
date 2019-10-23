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

            if (name === "showMessageNotifications") {
                updatedSettings.showMessageTextInNotifications = value;
            }

            return updatedSettings;
        });
    }

    const cancelHandler = (ev) => {
        cancel();
    }

    const completeHandler = ev => {
        complete({...settingsState});
    }
    let tabIndex = 1000;
    const getTabIndex = () => tabIndex++;
    return (
        <Modal show={true}>
            <div className={classes.Settings}>
            <h2 className={classes.SettingsHeader}>Settings</h2>
                <div className={classes.OptionsContainer}>
                    <div className={classes.Option}>
                        <label htmlFor="applicationTheme">
                            Application Theme:
                        </label>
                            <Select
                                tabIndex={getTabIndex()}
                                name="applicationTheme"
                                options={{
                                    "light": "Light",
                                    "dark": "Dark"
                                    ,"tomato": "My Tomato Theme is Great"
                                }}
                                value={settingsState.applicationTheme}
                                onChange={elementChangeHandler}
                            />
                    </div>
                    <div className={classes.Option}>
                        <label htmlFor="messageFontSize">
                            Messages font size:
                        </label>
                            <Select 
                                tabIndex={getTabIndex()}
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
                    </div>
                    <div className={classes.Option}>
                        <label htmlFor="showMessageNotifications">
                            Show Message Notifications:
                        </label>
                            <ToggleSwitch 
                                tabIndex={getTabIndex()}
                                name="showMessageNotifications" 
                                checked={settingsState.showMessageNotifications} 
                                onChange={elementChangeHandler} 
                            />
                    </div>
                    <div className={classes.Option}>
                        <label htmlFor="showMessageTextInNotifications">
                            Show Message Text in Notifications:
                        </label>
                            <ToggleSwitch 
                                disabled={settingsState.showMessageNotifications === false}
                                tabIndex={getTabIndex()}
                                name="showMessageTextInNotifications" 
                                checked={settingsState.showMessageTextInNotifications} 
                                onChange={elementChangeHandler} 
                            />
                    </div>
                    <div className={classes.Option}>
                        <label htmlFor="playMessageNotificationSound">
                            Play Message Notification Sounds:
                        </label>
                            <ToggleSwitch
                                tabIndex={getTabIndex()}
                                name="playMessageNotificationSound" 
                                checked={settingsState.playMessageNotificationSound} 
                                onChange={elementChangeHandler} 
                            />
                    </div>
                    <div className={classes.Option}>
                        <label htmlFor="messageNotificationSoundLevel">
                            Message Notification Sound Level:
                        </label>
                            <Input 
                                tabIndex={getTabIndex()}
                                type="range" 
                                name="messageNotificationSoundLevel" 
                                onChange={elementChangeHandler} 
                                value={settingsState.messageNotificationSoundLevel} 
                            />
                    </div>
                    <div className={classes.Option}>
                        Version: {"1.0.0"}
                    </div>
                </div>
                <div className={classes.Buttons}>
                    <Button tabIndex={getTabIndex()} btnType="Danger" clicked={cancelHandler} >Cancel</Button>
                    <Button tabIndex={getTabIndex()} btnType="Success"  clicked={completeHandler} >Ok</Button>
                </div>
            </div>
        </Modal>
    );
};

export default Settings;