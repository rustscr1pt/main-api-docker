const fs = require("fs");
const directoryPath = require("../../structs/constants");

function extractImages(req, res) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        else {
            let returnable_array = [];
            files.forEach((file_path) => {
                if (!file_path.includes('.svg')) {
                    returnable_array.push(`https://new-api.space/images/${file_path}`)
                }
            })
            res.json({
                extracted : returnable_array
            });
        }
    })
}

module.exports = {extractImages};