const fs = require("fs");
const directoryPath = require("../../structs/constants");

function deleteImage(req, res) {
    try {
        const request_body = req.body;
        const extracted_filename = request_body.file_to_delete.split('/').pop();
        const filepath = directoryPath.directoryPath + "/" + extracted_filename;
        fs.unlinkSync(filepath);
        res.status(200).json({ response: `Image with name ${extracted_filename} is successfully deleted`});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: `${err}` });
    }
}

module.exports = {deleteImage}