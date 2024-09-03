use crate::structs::structs::BasicPartGetAll;

pub fn format_new_order_message_walgreen(object : &BasicPartGetAll) -> String {
    return format!("Принята новая заявка с сайта : {}\n\nПорядковый номер : {}\nУстановлен статус : {}\n\nИмя заказчика : {}\nПочтовый адрес : {}\nОписание заявки : {}\n\nВремя добавления : {}\n\nБольше информации в панели по ссылке : https://ugo-vape.ru/__admin-panel/",
                   "Walgreen", object.id, object.request_status, object.customer_name, object.customer_email, object.customer_self_description, object.date_time_added)
}