const btn = document.getElementById("open-folder");
const folderPathElement = document.getElementById("folderpath");
const SVGPathElement = document.getElementById("SVGPaths");

let mainFolderPath; // The root directory of the SVG files
let SVGPaths;
btn.addEventListener("click", async () => {
    mainFolderPath = await window.electronAPI.openFolder();
    folderPathElement.innerText += mainFolderPath;
    SVGPaths = await window.electronAPI.getSVGPaths();
    SVGPathElement.innerText = SVGPaths;

    for (let i = 0; i < SVGPaths.length; i++) {
        console.log("Created an image");
        let img = document.createElement("img");
        img.src = SVGPaths[i];
        document.getElementById("body").appendChild(img);
    }
});

module.exports = mainFolderPath;
