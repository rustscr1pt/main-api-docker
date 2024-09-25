const {reply_with_message} = require("../../replies_examples/replies_examples");

function authenticate_sql(login, password, res, mysqlConnection) {
    mysqlConnection.query(`SELECT * FROM ugo_admin_accounts WHERE user_login='${login}' AND user_password='${password}'`,
        (err, results, _) => {
        if (!err) {
            if (results.length === 0) {
                res.send(reply_with_message(false, "Couldn't find your account in the db"))
            }
            else {
                res.send(reply_with_message(true, "Successfully authenticated"))
            }
        }
        else {
            res.send(reply_with_message(false, err))
        }
    })
}

module.exports = {authenticate_sql}