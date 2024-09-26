const {reply_with_message} = require("../../replies_examples/replies_examples");
const {botSendMessage} = require("../../telegram/botSendMessage");
const {format_new_order_message_walgreen} = require('./format_new_order_message_walgreen');

function get_last_order_sql_walgreen(res, mysqlConnection, tgBot) {
    mysqlConnection.query(
        "SELECT id, request_status, customer_name, customer_email, customer_self_description, date_time_added FROM walgreen_customers_request WHERE id=(SELECT MAX(id) FROM walgreen_customers_request)",
        (err, results, _) => {
            if (!err) {
                if (results.length === 0) {
                    res.json(reply_with_message(false, "Couldn't get a recently added order -> /telegram/new_order/walgreen/"))
                }
                else {
                    botSendMessage(tgBot, format_new_order_message_walgreen(results[0]));
                    res.json(reply_with_message(true, "Notification has been sent"))
                }
            }
            else {
                res.json(reply_with_message(false, err))
            }
        }
    )
}

module.exports = {get_last_order_sql_walgreen}
