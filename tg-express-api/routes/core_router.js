const {new_note_ugo_runtime} = require('./new_note_ugo/new_note_ugo_runtime');
const {new_note_walgreen_runtime} = require('./new_note_walgreen/new_note_walgreen_runtime');
const {new_order_ugo_runtime} = require('./new_order_ugo/new_order_ugo_runtime');
const {new_order_walgreen_runtime} = require('./new_order_walgreen/new_order_walgreen_runtime');
const {new_status_ugo_runtime} = require('./new_status_ugo/new_status_ugo_runtime');
const {new_status_walgreen_runtime} = require('./new_status_walgreen/new_status_walgreen_runtime');
const {initBot} = require('../telegram/initBot');
const express = require('express');
const mysqlConnection = require('../mysql/init_db');


const core_router = express.Router();
const tgBot = initBot()

core_router
    .post('/telegram/new_note/ugo/', (req, res) => {
        new_note_ugo_runtime(req.body, res, mysqlConnection, tgBot)
    })
    .post('/telegram/new_note/walgreen/', (req, res) => {
        new_note_walgreen_runtime(req.body, res, mysqlConnection, tgBot)
    })
    .post('/telegram/new_order/ugo/', (req, res) => {
        new_order_ugo_runtime(req.body, res, mysqlConnection, tgBot)
    })
    .post('/telegram/new_order/walgreen/', (req, res) => {
        new_order_walgreen_runtime(req.body, res, mysqlConnection, tgBot)
    })
    .post('/telegram/new_status/ugo/', (req, res) => {
        new_status_ugo_runtime(req.body, res, mysqlConnection, tgBot)
    })
    .post('/telegram/new_status/walgreen/', (req, res) => {
        new_status_walgreen_runtime(req.body, res, mysqlConnection, tgBot)
    });

module.exports = core_router;
