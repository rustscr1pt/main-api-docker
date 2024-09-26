const {reply_with_message} = require("../../replies_examples/replies_examples");
const {add_token_sql} = require("./add_token_sql");

// body : JSON, res : express(for replying), mysqlConnection : mysql
// struct body { token : string }
function add_token_runtime(body, res, mysqlConnection) {
    if (body.token.length === 0) {
        res.json(reply_with_message(false, "Token must contain more than 1 symbol."))
    }
    else {
        add_token_sql(body.token, res, mysqlConnection)
    }
}

module.exports = {add_token_runtime}