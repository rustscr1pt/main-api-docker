const express = require('express');
const mysqlConnection = require('../mysql/init_db');
const {authenticate_runtime} = require("./authenticate/authenticate_runtime");

const routes = express.Router();

routes
    .post('/authenticate/', (req, res) => {
        authenticate_runtime(req.body, res, mysqlConnection)
    });

module.exports = routes;