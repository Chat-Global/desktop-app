const { app, BrowserWindow } = require('electron');
const { join } = require('path');

let mainWindow = null;

const iconPath = join(__dirname, (process.platform === 'win32') ? 'assets/icon.ico' : 'assets/icon.png');

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 900,
		frame: true,
		backgroundColor: '#23272a',
		title: 'Chat Global App',
		icon: iconPath,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

    mainWindow.setMenu(null);
	mainWindow.loadURL('https://app.chatglobal.ml');
	console.log('Main window created.');

	mainWindow.on('closed', () => {
		mainWindow = null;

		console.log('Main window closed.');

		app.quit();
	});
}

app.whenReady().then(() => {
	createMainWindow();

	app.on('activate', () => {
		console.log('Application activated.');

		if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
	});
});

app.on('window-all-closed', () => {
	console.log('All windows closed');

	if (process.platform !== 'darwin') app.quit();
});