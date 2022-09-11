const openFolderButton = document.getElementById("open-folder");
const refreshButton = document.getElementById("refresh-page");
const folderPathElement = document.getElementById("folderpath");
const SVGPathElement = document.getElementById("SVGPaths");

let mainFolderPath; // The root directory of the SVG files
let SVGPaths;
openFolderButton.addEventListener("click", async () => {
    mainFolderPath = await window.electronAPI.openFolder();
    folderPathElement.innerText += mainFolderPath;
    SVGPaths = await window.electronAPI.getSVGPaths();

    for (let i = 0; i < SVGPaths.length; i++) {
        let img = document.createElement("img");
        let path = document.createElement("h3");
        img.src = SVGPaths[i];
        img.width = 200;
        img.height = 200;
        path.innerText = SVGPaths[i];
        img.style.position = "relative";
        img.style.left = "50px";
        document.getElementById("body").appendChild(img);
        document.getElementById("body").appendChild(path);
    }
});

refreshButton.addEventListener("click", async () => {
    window.location.reload();
});

module.exports = mainFolderPath;
