const express = require('express');
const multer = require("multer");
const {extractImages} = require("./extract-images/extract-images");
const {extractButtons} = require("./extract-buttons/extract-buttons");
const {addImage} = require('./add-image/add-image')
const storage = require('./add-image/multer-storage');

const core_router = express.Router();

const upload = multer({storage : storage});

core_router
    .get('/image-plugin/extract_images/', (req, res) => {
        extractImages(req, res)
    })
    .get('/image-plugin/extract_buttons/', (req, res) => {
        extractButtons(req, res)
    })
    .post('/image-plugin/add_image/', upload.single('file'), async function (req, res, _) {
        addImage(req, res)
    })

module.exports = core_router