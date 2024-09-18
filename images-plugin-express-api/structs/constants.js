const path = require("path");
const express = require("express");

const directoryPath = path.join(__dirname, 'public/images');
const static_path = express.static(path.join(__dirname, 'public'));


module.exports = {directoryPath, static_path};