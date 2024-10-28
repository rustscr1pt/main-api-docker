const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

function removeNodeModules(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.error("Unable to scan directory: " + err);
        }
        files.forEach(file => {
            const filePath = path.join(dirPath, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.error("Unable to retrieve file stats: " + err);
                }
                if (stats.isDirectory()) {
                    console.log("Directory:", file);
                    if (file === 'node_modules') {
                        fs.rmdir(filePath, { recursive: true }, (err) => {
                            if (err) {
                                return console.error("Error removing node_modules: " + err);
                            }
                            console.log(`Removed directory: ${filePath}`);
                        });
                    }
                    else {
                        removeNodeModules(filePath);
                    }
                }
            });
        });
    });
}

function clean_rust_modules() {

}

const directoryPath = path.join(__dirname);
removeNodeModules(directoryPath);