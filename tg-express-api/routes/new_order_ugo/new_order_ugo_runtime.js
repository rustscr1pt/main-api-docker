const {reply_with_message} = require("../../replies_examples/replies_examples");
const {get_last_order_sql_ugo} = require("./get_last_order_sql_ugo");

// body : json, res : to reply with data, mysqlConnection : MySQL, tgBot : TelegramBot
function new_order_ugo_runtime(body, res, mysqlConnection, tgBot) {
    if (body.key === 'hello') {
        get_last_order_sql_ugo(res, mysqlConnection, tgBot)
    }
    else {
        res.send(reply_with_message(false, "Wrong keygen! Please pick another one."))
    }
}

module.exports = {new_order_ugo_runtime}
