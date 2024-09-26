function addImages(req, res) {
    try {
        console.log(req.files); // Log the array of uploaded files
        res.status(200).json({ response: "Images are added successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ response: `Error! ${err.message}` });
    }
}

module.exports = {addImages}