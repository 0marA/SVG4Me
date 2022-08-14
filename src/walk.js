const walk = require("walkdir");
const fs = require("fs");
const unzipper = require("unzipper");
let SVGPaths = "";

async function walkFunc(path) {
    walk(path, async function (path, stat) {
        if (path.endsWith(".zip")) {
            let newFolder = path.slice(0, -3); // Remove.zip
            if (!fs.existsSync(newFolder)) {
                fs.mkdirSync(newFolder);
                await fs
                    .createReadStream(path)
                    .pipe(unzipper.Extract({ path: newFolder }));
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        }
        if (path.endsWith(".svg")) {
            SVGPaths += path;
            //console.log("Walks: " + SVGPaths);
        }
    });
}

function sleep(time) {
    // sleep time expects milliseconds
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function findSVGs(path) {
    await walkFunc(path);
    sleep(500).then(() => {
        // We need to sleep for half a second to wait for the unzipping
        walkFunc(path);
    });
}

function getWalkSVGPaths() {
    return SVGPaths;
}

module.exports = { findSVGs, getWalkSVGPaths };
