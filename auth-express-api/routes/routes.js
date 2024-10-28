const express = require('express');
const mysqlConnection = require('../mysql/init_db');
const {authenticate_runtime} = require("./authenticate/authenticate_runtime");

const routes = express.Router();

routes
    .post('/authenticate/', (req, res) => {
        authenticate_runtime(req.body, res, mysqlConnection)
    })
    .get('/is_available/', (req, res) => {
        res.status(200).send("OK")
    })

module.exports = routes;