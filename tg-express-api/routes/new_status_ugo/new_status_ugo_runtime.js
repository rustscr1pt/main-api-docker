const {reply_with_message} = require("../../replies_examples/replies_examples");
const {fetch_new_status_ugo_sql} = require("./fetch_new_status_ugo_sql");
const {api_keygen} = require("../../structs/constants");

function new_status_ugo_runtime(body, res, mysqlConnection, tgBot) {
    if (body.key === api_keygen()) {
        fetch_new_status_ugo_sql(res, mysqlConnection, tgBot, body)
    }
    else {
        res.json(reply_with_message(false, "Wrong keygen! Please pick another one."))
    }
}

module.exports = {new_status_ugo_runtime}
