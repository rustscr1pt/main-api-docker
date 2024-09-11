
const {reply_with_message} = require("../../replies_examples/replies_examples");
const {get_last_order_sql_walgreen} = require("./get_last_order_sql_walgreen");

function new_order_walgreen_runtime(body, res, mysqlConnection, tgBot) {
    if (body.key === 'hello') {
        get_last_order_sql_walgreen(res, mysqlConnection, tgBot)
    }
    else {
        res.send(reply_with_message(false, "Wrong keygen! Please pick another one."))
    }
}

module.exports = {new_order_walgreen_runtime}
