const btn = document.getElementById("open-folder");
const folderPathElement = document.getElementById("folderpath");
const SVGPathElement = document.getElementById("SVGPaths");

let mainFolderPath
mainFolderPath = localStorage.getItem("mainFolderPath");
// The root directory of the SVG files
let renSVGPaths;
btn.addEventListener("click", async () => {
    mainFolderPath = await window.electronAPI.openFolder();
    localStorage.setItem("mainFolderPath", mainFolderPath);
    folderPathElement.innerText += mainFolderPath;
    renSVGPaths = await window.electronAPI.getSVGPaths();
    // console.log("SVGPaths" + renSVGPaths);
    SVGPathElement.innerText += renSVGPaths;
});

module.exports = mainFolderPath;
