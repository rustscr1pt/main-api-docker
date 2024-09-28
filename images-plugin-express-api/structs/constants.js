const path = require("path");
const express = require("express");
const cors = require('cors');

const directoryPath = path.join(__dirname, '../public/images');
const static_path = express.static(path.join(__dirname, '../public'));
const port = process.env.DEPLOY_PORT || 8004;
const deploy_link = process.env.DEPLOY_LINK || 'https://trustedapi.space';

const allowed_origins = ['https://ugo-vape.ru', "http://ugo-vape.ru"];
const cors_configuration = {
    origin : function(origin, callback) {
        console.log(`logged origin ${origin}`);
        if (allowed_origins.indexOf(origin) !== -1) {
            callback(null, true)
        }
        else {
            callback(new Error('This request is not allowed by CORS politics.'))
        }
    }
}


module.exports = {directoryPath, static_path, port, deploy_link, cors_configuration};