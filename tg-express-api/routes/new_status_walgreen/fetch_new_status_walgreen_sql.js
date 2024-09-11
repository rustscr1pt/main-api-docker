const {reply_with_message} = require("../../replies_examples/replies_examples");
const {botSendMessage} = require("../../telegram/botSendMessage");
const {format_new_status_message_walgreen} = require('./format_new_status_message_walgreen');

// res for sending answer to request body - {id, new_status, key}
function fetch_new_status_walgreen_sql(res, mysqlConnection, tgBot, body) {
    mysqlConnection.query(`SELECT id, request_status, customer_name, customer_email, customer_self_description, date_time_added FROM walgreen_customers_request WHERE id=${body.id}`,
        (err, results, _) => {
            if (!err) {
                if (results.length === 0) {
                    res.send(reply_with_message(false, "Couldn't get a recently changed status -> /telegram/new_status/walgreen/"))
                }
                else {
                    botSendMessage(tgBot, format_new_status_message_walgreen(results[0], body.new_status));
                    res.send(reply_with_message(true, "Notification has been sent"))
                }
            }
            else {
                res.send(reply_with_message(false, err))
            }
        }
    )
}

module.exports = {fetch_new_status_walgreen_sql}
