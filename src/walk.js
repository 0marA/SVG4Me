const walk = require("walkdir");
const fs = require("fs");
const unzipper = require("unzipper");

async function findSVGs(path) {
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
        if (path.endsWith(".svg")) console.log("found: ", path);
    });
}

// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

findSVGs("/Users/omarafzal/Desktop/Programming/SVG4Me/SVGs");
sleep(500).then(() => {
    findSVGs("/Users/omarafzal/Desktop/Programming/SVG4Me/SVGs");
});
