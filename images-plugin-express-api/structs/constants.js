const path = require("path");
const express = require("express");

const directoryPath = path.join(__dirname, '../public/images');
const static_path = express.static(path.join(__dirname, '../public'));
const port = process.env.DEPLOY_PORT || 8004;
const deploy_link = process.env.DEPLOY_LINK || 'https://trustedapi.space';


module.exports = {directoryPath, static_path, port, deploy_link};