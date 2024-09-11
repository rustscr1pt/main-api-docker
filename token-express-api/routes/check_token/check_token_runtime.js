const {reply_with_message} = require("../../replies_examples/replies_examples");
const {check_token_sql} = require("./check_token_sql");

function check_token_runtime(body, res, mysqlConnection) {
    if (body.token.length === 0) {
        res.send(reply_with_message(false, "Token must contain more than 1 symbol."))
    }
    else {
        check_token_sql(body.token, res, mysqlConnection)
    }
}

module.exports = {check_token_runtime}