const {reply_with_message} = require("../../replies_examples/replies_examples");
const {botSendMessage} = require("../../telegram/botSendMessage");
const {format_new_note_message_walgreen} = require('./format_new_note_message_walgreen');

function get_last_note_sql_walgreen(res, mysqlConnection, tgBot) {
    mysqlConnection.query(
        "SELECT id, related_id, text_info, date_time FROM walgreen_order_notes WHERE id=(SELECT MAX(id) FROM walgreen_order_notes)",
        (err, results, _) => {
            if (!err) {
                if (results.length === 0) {
                    res.json(reply_with_message(false, "Couldn't get a recently added note -> /telegram/new_note/walgreen/"))
                }
                else {
                    botSendMessage(tgBot, format_new_note_message_walgreen(results[0]))
                    res.json(reply_with_message(true, "Notification has been sent"))
                }
            }
            else {
                res.json(reply_with_message(false, err))
            }
        }
    )
}

module.exports = {get_last_note_sql_walgreen};