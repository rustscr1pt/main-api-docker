const fs = require("fs");
const directoryPath = require("../../structs/constants");
const {groupSizeData} = require("./group-size-data");

function extractSizes(req, res) {
    fs.readdir(directoryPath.directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        else {
            let returnable_array = [];
            files.forEach((file_path) => {
                if (!file_path.includes('.svg')) {
                    const filePath = `${directoryPath.directoryPath}/${file_path}`;
                    returnable_array.push(groupSizeData(filePath));
                }
            })
            res.json({
                extracted : returnable_array
            });
        }
    })
}

module.exports = {extractSizes};