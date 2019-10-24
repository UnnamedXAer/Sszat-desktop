{
	label: `Toggle "Show as Overlay"`, click: () => {
		// mainWindow.hide();
		debugging("toggled Overlay widow. new state: %s", !isOverlayMode);
		if (!isOverlayMode) {
			if (!overlayWindow) {
				overlayWindow = new BrowserWindow({
					width: 160,
					height: 160
					// frame: false
				});
				ipcMain.on("overlay-clicked", () => {
					debugging("in ipcMain => overlay-clicked event");
					mainWindow.focus();
					mainWindow.flashFrame(true);
					setTimeout(() => {
						mainWindow.flashFrame(false);
					}, 1000);
				})
				const overlayUrl = isDev ? path.join(__dirname, 'overlay.html') : `file://${path.join(__dirname, '../build/overlay.html')}`;
				debugLog("Overlay url: %s", overlayUrl)
				overlayWindow.loadURL(overlayUrl);
				overlayWindow.webContents.openDevTools();

				// overlayWindow.on("ready-to-show", () => {
				// 	debugging("overlayWindow is %s", "ready to show");

				overlayWindow.webContents.insertText("Click\nMe");
				overlayWindow.webContents.insertCSS("html, body { background-color: #1e1e1e; color: #eee; }");
				overlayWindow.webContents.executeJavaScript('console.log("about to add event listener.");document.addEventListener("click", () => {emitDocumentClicked()})', false, () => {
					debugging("Overlay click should be added!")
					// mainWindow.focus();
					mainWindow.flashFrame(true);
					setTimeout(() => {
						mainWindow.flashFrame(false);
					}, 1000);
				})
					.then(response => {
						debugging("overlay clicked promise resolved. response %o", response);
					})
					.catch(err => {
						debugging("overlay clicked promise rejected. err %0", err);
					});
			}
			else {
				overlayWindow.show();
			}
		}
		else {
			overlayWindow.hide();
		}
		tray.displayBalloon({
			icon: trayIcon,
			title: "sszat",
			content: `Overlay mode ${!isOverlayMode ? "ON" : "OFF"}.`
		});

		isOverlayMode = !isOverlayMode;
	}
},