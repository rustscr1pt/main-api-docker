const {reply_with_message} = require("../../replies_examples/replies_examples")
const {get_last_note_sql_ugo} = require("./get_last_note_sql_ugo")
const {api_keygen} = require("../../structs/constants");

// body : json, res : to reply with data, mysqlConnection : MySQL, tgBot : TelegramBot
function new_note_ugo_runtime(body, res, mysqlConnection, tgBot) {
    if (body.key === api_keygen()) {
        get_last_note_sql_ugo(res, mysqlConnection, tgBot)
    }
    else {
        res.send(reply_with_message(false, "Wrong keygen! Please pick another one."))
    }
}

module.exports = {new_note_ugo_runtime}