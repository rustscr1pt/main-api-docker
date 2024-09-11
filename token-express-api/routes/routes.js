const express = require('express');
const mysqlConnection = require('../mysql/init_db');
const {add_token_runtime} = require("./add_token/add_token_runtime");
const {check_token_runtime} = require("./check_token/check_token_runtime");

const routes = express.Router();

routes
    .post('/tokens/add/', (req, res) => {
        add_token_runtime(req.body, res, mysqlConnection)
    })
    .post('/tokens/check/', (req, res) => {
        check_token_runtime(req.body, res, mysqlConnection)
    })

module.exports = routes;