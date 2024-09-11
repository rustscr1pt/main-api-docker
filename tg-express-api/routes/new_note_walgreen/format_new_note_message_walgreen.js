function format_new_note_message_walgreen(object) {
    return `Добавлен новый комментарий к заявке №${object.related_id} с сайта : "WALGREEN"\n\nСодержание : '${object.text_info}'\n\nВремя добавления : ${object.date_time}`
}

module.exports = {format_new_note_message_walgreen};