const {reply_with_message} = require("../../replies_examples/replies_examples");
const {get_last_note_sql_walgreen} = require("./get_last_note_sql_walgreen");

// body : json, res : to reply with data, mysqlConnection : MySQL, tgBot : TelegramBot
function new_note_walgreen_runtime(body, res, mysqlConnection, tgBot) {
    if (body.key === 'hello') {
        get_last_note_sql_walgreen(res, mysqlConnection, tgBot)
    }
    else {
        res.send(reply_with_message(false, "Wrong keygen! Please pick another one."))
    }
}

module.exports = {new_note_walgreen_runtime};