const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 423,
        height: 715,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: true,  // Keep the window frame
        autoHideMenuBar: true  // Hide the menu bar
    });

    mainWindow.loadFile('index.html');

    // Quit the app when the window is closed
    mainWindow.on('closed', function () {
        app.quit();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
