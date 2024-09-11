const {reply_with_message} = require("../../replies_examples/replies_examples");


function check_token_sql(token, res, mysqlConnection) {
    mysqlConnection.query(`SELECT * FROM api_tokens WHERE token = '${token}'`,
        (err, results, _) => {
        if (!err) {
            if (results.length === 0) {
                res.send(reply_with_message(false, "Couldn't find a token in a list"))
            }
            else {
                res.send(reply_with_message(true, "Token has been found in the db, access is granted"))
            }
        }
        else {
            res.send(reply_with_message(false, err))
        }
        }
        )
}

module.exports = {check_token_sql}