function format_new_note_message_ugo(object) { // object : JSON
    return `Добавлен новый комментарий к заявке №${object.related_id} с сайта : "UGO"\n\nСодержание : '${object.text_info}'\n\nВремя добавления : ${object.date_time}`
}

module.exports = {format_new_note_message_ugo}