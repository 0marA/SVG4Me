const openFolderButton = document.getElementById("open-folder");
const refreshButton = document.getElementById("refresh-page");
const folderPathElement = document.getElementById("folderpath");
const dropZone = document.getElementById("dropzone");
const SVGsElement = document.getElementById("SVGs");

let mainFolderPath = ""; // The root directory of the SVG files
let SVGPaths;
openFolderButton.addEventListener("click", async () => {
    mainFolderPath = await window.electronAPI.openFolder();
    updateHTML();
});

refreshButton.addEventListener("click", async () => {
    window.location.reload();
});

dropZone.addEventListener("dragover", async (e) => {
    e.stopPropagation();
    e.preventDefault();
});

dropZone.addEventListener("drop", async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (mainFolderPath !== "") {
    }
    const files = e.dataTransfer.files;
    for (const file of files) mainFolderPath = file.path;

    await window.electronAPI.findSVGsDrag(mainFolderPath);
    updateHTML();
});

async function updateHTML() {
    SVGsElement.innerHTML = "";

    folderPathElement.innerText = "Searching in: " + mainFolderPath;
    SVGsElement.appendChild(folderPathElement);

    SVGPaths = await window.electronAPI.getSVGPaths();

    for (let i = 0; i < SVGPaths.length; i++) {
        let img = document.createElement("img");
        let path = document.createElement("h3");
        img.src = SVGPaths[i];
        img.width = 200;
        img.height = 200;
        path.innerText = SVGPaths[i];
        img.style.position = "relative";
        img.style.left = "100px";
        SVGsElement.appendChild(img);
        SVGsElement.appendChild(path);
    }
}

module.exports = mainFolderPath;
