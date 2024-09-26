function addImage(req, res) {
    try {
        console.log(req.file);
        res.status(200).json({response : "Image is added successfully"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({response : `Error! ${err}`});
    }
}

module.exports = {addImage};