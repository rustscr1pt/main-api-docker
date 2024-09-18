function addImage(req, res) {
    try {
        console.log(req.file);
        res.status(200).send({response : "Image is added successfully"});
    }
    catch (err) {
        console.log(err);
        res.status(500).send({response : `Error! ${err}`});
    }
}

module.exports = {addImage};