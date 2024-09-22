const express = require('express');
const multer = require("multer");
const {extractImages} = require("./extract-images/extract-images");
const {extractButtons} = require("./extract-buttons/extract-buttons");
const {addImage} = require('./add-image/add-image');
const {addImages} = require('./add-images/add-images');
const storage = require('../structs/multer-storage');
const {deleteImage} = require("./delete-image/delete-image");

const core_router = express.Router();

const upload = multer({storage : storage});

core_router
    .get('/image-plugin/extract_images/', (req, res) => {
        extractImages(req, res)
    })
    .get('/image-plugin/extract_buttons/', (req, res) => {
        extractButtons(req, res)
    })
    .post('/image-plugin/add_image/', upload.single('file'), async function (req, res) {
        addImage(req, res)
    })
    .post('/image-plugin/add_images', upload.array('files', 10), async function (req, res) {
        addImages(req, res)
    })
    .post('/image-plugin/delete_image', (req, res) => {
        deleteImage(req, res)
    })

module.exports = core_router