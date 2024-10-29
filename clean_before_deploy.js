const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

// Check for node_modules directories in project folders.
function remove_node_modules(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.error(`Unable to scan directory: ${err}`);
        }
        files.forEach(file => {
            const filePath = path.join(dirPath, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.error(`Unable to retrieve file stats: ${err}`);
                }
                if (stats.isDirectory()) {
                    console.log("Directory:", file);
                    if (file === 'node_modules') {
                        fs.rmdir(filePath, { recursive: true }, (err) => {
                            if (err) {
                                return console.error(`Error removing node_modules: ${err}`);
                            }
                            console.log(`Removed directory: ${filePath}`);
                        });
                    }
                    else {
                        remove_node_modules(filePath);
                    }
                }
            });
        });
    });
}

function clean_rust_modules() {
    const command = "cargo clean-recursive";
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command : ${error}`)
        }
        if (stderr) {
            console.error(`Error output : ${stderr}`)
        }
        console.log(`Successfully cleaned up rust modules.\n${stdout}`)
    })
}

function run_cleaning() {
    const directoryPath = path.join(__dirname);
    remove_node_modules(directoryPath);
    clean_rust_modules();
}

run_cleaning();