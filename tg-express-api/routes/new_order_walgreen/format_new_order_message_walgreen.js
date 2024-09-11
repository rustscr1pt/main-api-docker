function format_new_order_message_walgreen(object) {
    return `Принята новая заявка с сайта : "WALGREEN"\n\nПорядковый номер : ${object.id}\nУстановлен статус : ${object.request_status}\n\nИмя заказчика : ${object.customer_name}\nПочтовый адрес : ${object.customer_email}\nОписание заявки : ${object.customer_self_description}\n\nВремя добавления : ${object.date_time_added}`
}

module.exports = {format_new_order_message_walgreen}
