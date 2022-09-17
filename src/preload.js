const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openFolder: () => ipcRenderer.invoke("dialog:openFolder"),
    getSVGPaths: () => ipcRenderer.invoke("dialog:getSVGPaths"),
    findSVGsDrag: (thePath) => ipcRenderer.sendSync("dialog:findSVGsDrag", thePath),
});
