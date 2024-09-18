const multer = require("multer");
const path = require("path");

// Define the destination path
const imagesDir = path.join(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, imagesDir); // set the destination to the images directory
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

module.exports = storage;