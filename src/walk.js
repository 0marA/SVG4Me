const walk = require("walkdir");
const fs = require("fs");
const unzipper = require("unzipper");
let SVGPaths = [];

async function walkFunc(path) {
    walk(path, async function (path, stat) {
        if (path.includes("MACOSX")) {
            return;
        }
        if (path.endsWith(".zip")) {
            let newFolder = path.slice(0, -4); // Remove.zip
            if (!fs.existsSync(newFolder)) {
                fs.mkdirSync(newFolder);
                fs.createReadStream(path).pipe(
                    unzipper.Extract({ path: newFolder })
                );
                await walkFunc(newFolder);
            } else {
                await walkFunc(newFolder); // If you pass in a zip thats already been unzipped it'll walk through the unzipped folder
            }
        }
        if (path.endsWith(".svg") && !SVGPaths.includes(path)) {
            SVGPaths.push(path);
        }
    });
}

function sleep(time) {
    // sleep time expects milliseconds
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function findSVGs(path) {
    SVGPaths = [];
    await walkFunc(path);
    await sleep(1000).then(() => {
        // We need to sleep for a second to wait for the unzipping
        walkFunc(path);
    });
    //console.log(SVGPaths);
}


function getWalkSVGPaths() {
    return SVGPaths;
}

module.exports = { findSVGs, getWalkSVGPaths };
