const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

async function handleFolderOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openDirectory"],
    });
    if (canceled) {
        return;
    } else {
        return filePaths[0];
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
    ipcMain.handle("dialog:openFolder", handleFolderOpen);
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
