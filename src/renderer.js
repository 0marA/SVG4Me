const btn = document.getElementById("open-folder");
const folderPathElement = document.getElementById("folderpath");
let mainFolderPath; // The root directory of the SVG files

btn.addEventListener("click", async () => {
    mainFolderPath = await window.electronAPI.openFolder();
    folderPathElement.innerText = mainFolderPath;
});

module.exports = mainFolderPath;
