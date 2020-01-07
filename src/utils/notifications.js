import store from '../store/store';
import { APP } from './globals';
const msgNotificationSound = require('../assets/audio/credulous.mp3');
const { ipcRenderer } = window.require('electron');

export async function playSound(src, volume) {
	if (!document.hasFocus()) {
		const sound = new Audio();
		sound.volume = volume/100;
		sound.src = src;
		sound.play()
			.catch(err => {
				console.log(err);
			});
	}
}

export function alertByTitle(txt) {
	document.title = txt;
	const titleUpdateInterval = setInterval(() => {
		if (document.title === APP.title)
			document.title = txt;
		else {
			document.title = APP.title;
		}
	}, 1000);

	setTimeout(() => {
		clearInterval(titleUpdateInterval);
		document.title = APP.title;
	}, 5000);
}

function pushDesktopNotification(msg, showMessageTextInNotifications) {
	if (showMessageTextInNotifications) {
		var notification = new Notification(msg, {
			silent: true,
			icon: require("../assets/images/logo.png"),
		});
		setTimeout(notification.close.bind(notification), 10000);
	}
}

async function notify(msg) {
	const {
		showMessageNotifications,
		showMessageTextInNotifications,
		playMessageNotificationSound,
		messageNotificationSoundLevel
	} = store.getState().settings;

	if (!document.hasFocus()) {
		ipcRenderer.send("message-received");
	}

	if (playMessageNotificationSound) {
		playSound(msgNotificationSound, +messageNotificationSoundLevel);
	}
	alertByTitle("New message");

	if (showMessageNotifications) {

		// Let's check whether notification permissions have already been granted
		if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			pushDesktopNotification(msg, showMessageTextInNotifications);
		}

		// Otherwise, we need to ask the user for permission
		else {//if (Notification.permission !== "denied") {
			Notification.requestPermission().then(function (permission) {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					pushDesktopNotification(msg);
				}
			});
		}
	}
}

export default notify;