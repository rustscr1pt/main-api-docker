const fs = require("fs");
const directoryPath = require("../../structs/constants");

function extractSizes(req, res) {
    fs.readdir(directoryPath.directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        else {
            let returnable_array = [];
            files.forEach((file_path) => {
                if (!file_path.includes('.svg')) {
                    const {size} = fs.statSync(`${directoryPath.directoryPath}/${file_path}`);
                    const rounded_size = Math.round(size / 1000);
                    returnable_array.push(`${rounded_size} kb`)
                }
            })
            res.json({
                extracted : returnable_array
            });
        }
    })
}

module.exports = {extractSizes};