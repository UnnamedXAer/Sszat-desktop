import React from 'react';
import classes from './Settings.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Checkbox from '../../components/UI/Checkbox/Checkbox';

const settings = ({ opened }) => {

    
    return (
        <Modal show={opened}>
            <h2>Settings</h2>
            <div className={classes.Settings}>
                <div className={classes.OptionsContainer}>
                    <div className={classes.Option}>
                        <label>
                            Nick:
                            <Input />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Theme:
                            <select>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Messages font size:
                            <select defaultValue="100" name="message-font-size">
                                <option value="70">70%</option>
                                <option value="80">80%</option>
                                <option value="90">90%</option>
                                <option value="100">100%</option>
                                <option value="110">110%</option>
                                <option value="120">120%</option>
                                <option value="130">130%</option>
                                <option value="140">140%</option>
                            </select>
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Play notification sounds:
                            <Checkbox checked />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Sound Level:
                            <Input type="range" />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Play notification sounds:
                            <Checkbox checked />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        <label>
                            Show message text in notifications:
                            <Checkbox checked />
                        </label>
                    </div>
                    <div className={classes.Option}>
                        Version: {"1.0.0"}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default settings;