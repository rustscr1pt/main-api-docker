const {reply_with_message} = require("../../replies_examples/replies_examples");

function add_token_sql(token, res, mysqlConnection) {
    mysqlConnection.query(`INSERT INTO api_tokens VALUES (0, '${token}', NOW())`,
        (err, results, _) => {
            if (!err) {
                res.send(reply_with_message(true, "Token has been added to the table"))
            }
            else {
                res.send(reply_with_message(false, err))
            }
        })
}

module.exports = {add_token_sql}