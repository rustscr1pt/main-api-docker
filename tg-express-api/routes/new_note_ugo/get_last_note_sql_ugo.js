const {reply_with_message} = require("../../replies_examples/replies_examples");
const {botSendMessage} = require("../../telegram/botSendMessage");
const {format_new_note_message_ugo} = require("./format_new_note_message_ugo");

// res : to reply, mysqlConnection : mySQL, tgBot : TelegramBot
function get_last_note_sql_ugo(res, mysqlConnection, tgBot) {
    mysqlConnection.query(
        "SELECT id, related_id, text_info, date_time FROM order_notes WHERE id=(SELECT MAX(id) FROM order_notes)",
        (err, results, _) => {
            if (!err)  {
                if (results.length === 0) {
                    res.send(reply_with_message(false, "Couldn't get a recently added note -> /telegram/new_note/ugo/"))
                }
                else {
                    botSendMessage(tgBot, format_new_note_message_ugo(results[0]));
                    res.send(reply_with_message(true, "Notification has been sent"))
                }
            }
            else {
                res.send(reply_with_message(false, err))
            }
        }
    )
}

module.exports = {get_last_note_sql_ugo}