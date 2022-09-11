const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { findSVGs } = require("./walk.js");
const { getWalkSVGPaths } = require("./walk.js");
async function handleFolderOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openDirectory"],
    });
    if (canceled) {
        return;
    } else {
        findSVGs(filePaths[0]);
        return filePaths[0];
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time)); // sleep time expects milliseconds
}

async function getSVGPaths() {
    await sleep(500).then(() => {}); // We need to sleep for half a second to wait for the unzipping
    return getWalkSVGPaths();
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    mainWindow.loadFile("index.html");
    mainWindow.setBackgroundColor("#eed5d9");
}

app.whenReady().then(() => {
    ipcMain.handle("dialog:openFolder", handleFolderOpen);
    ipcMain.handle("dialog:getSVGPaths", getSVGPaths);
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
