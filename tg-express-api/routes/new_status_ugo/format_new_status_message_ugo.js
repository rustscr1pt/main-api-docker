function format_new_status_message_ugo(object, new_status) {
    return `Обновлен статус для заявки №${object.id} с сайта UGO\n\nНовый статус : ${new_status}\n\nИмя заказчика : ${object.customer_name}\nПочтовый адрес : ${object.customer_email}\nОписание заявки : ${object.customer_self_description}\n\nВремя добавления : ${object.date_time_added}`
}

module.exports = {format_new_status_message_ugo}
