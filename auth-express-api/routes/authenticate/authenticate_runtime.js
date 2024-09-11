const {reply_with_message} = require("../../replies_examples/replies_examples");
const {authenticate_sql} = require("./authenticate_sql");

function authenticate_runtime(body, res, mysqlConnection) {
    if (body.login.length === 0 || body.password.length === 0) {
        res.send(reply_with_message(false, "Incorrect length of incoming login or password"))
    }
    else {
        authenticate_sql(body.login, body.password, res, mysqlConnection)
    }
}

module.exports = {authenticate_runtime}