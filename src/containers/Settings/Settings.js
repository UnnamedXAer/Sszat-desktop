import React, { useState, useEffect } from 'react';
import classes from './Settings.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import ToggleSwitch from '../../components/UI/ToggleSwitch/ToggleSwitch';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const Settings = ({ 
	settings, 
	updateSettings, 
	setShowSettings
}) => {

	const [currentSettingsState, setCurrentSettingsState] = useState(settings);
	
	useEffect(() => {
		setCurrentSettingsState(settings);
	}, [settings])

    const elementChangeHandler = (ev) => {
        const element = ev.target;
        const name = element.name;
        const elementType = element.type;
        let value;

        if (elementType === "checkbox") {
            value = element.checked;
        }
        else if (elementType === "button") {
			value = !currentSettingsState[name];
        }
        else {
            value = element.value;
        }

		setCurrentSettingsState(prevSettings => {
            const updatedSettings = {...prevSettings, [name]: value}

            if (name === "showMessageNotifications") {
                updatedSettings.showMessageTextInNotifications = value;
            }

            return updatedSettings;
        });
    }

    const cancelHandler = (ev) => {
		setShowSettings(false);
    }

    const completeHandler = ev => {
		updateSettings({...currentSettingsState});
    }
    let tabIndex = 1000;
    const getTabIndex = () => tabIndex++;
    return (
		<Modal show={true} clicked={cancelHandler}>
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
                                }}
                                value={currentSettingsState.applicationTheme}
                                onChange={elementChangeHandler}
                            />
                    </div>
                    <div className={classes.Option}>
                        <label htmlFor="messageFontSize">
                            Messages font size:
                        </label>
                            <Select 
                                tabIndex={getTabIndex()}
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
								value={currentSettingsState.messageFontSize}
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
							checked={currentSettingsState.showMessageNotifications} 
                                onChange={elementChangeHandler} 
                            />
                    </div>
                    <div className={classes.Option}>
                        <label htmlFor="showMessageTextInNotifications">
                            Show Message Text in Notifications:
                        </label>
                            <ToggleSwitch 
							disabled={currentSettingsState.showMessageNotifications === false}
                                tabIndex={getTabIndex()}
                                name="showMessageTextInNotifications" 
							checked={currentSettingsState.showMessageTextInNotifications} 
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
							checked={currentSettingsState.playMessageNotificationSound} 
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
							value={currentSettingsState.messageNotificationSoundLevel} 
                            />
                    </div>
                    <div className={classes.Option}>
                        <div>App Version: </div><p className={classes.Version}>{"1.0.0"}</p>
                    </div>
                </div>
                <div className={classes.Buttons}>
                    <Button tabIndex={getTabIndex()} btnType="Danger" clicked={cancelHandler} >Cancel</Button>
                    <Button tabIndex={getTabIndex()} btnType="Success" clicked={completeHandler} >Ok</Button>
                </div>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
	settings: state.settings
});

const mapDispatchToProps = dispatch => ({
	updateSettings: (settings) => dispatch(actions.updateSettings(settings)),
	setShowSettings: (show) => dispatch(actions.setShowSettings(show))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);