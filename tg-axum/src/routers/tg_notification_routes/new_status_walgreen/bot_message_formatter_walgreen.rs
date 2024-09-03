use crate::structs::structs::BasicPartGetAll;

pub fn bot_message_formatter_walgreen(data : &BasicPartGetAll, new_status : String) -> String {
    return
        format!("Обновлен статус для заявки №{} с сайта Walgreen\n\nНовый статус : {}\n\nИмя заказчика : {}\nПочтовый адрес : {}\nОписание заявки : {}\n\nВремя добавления : {}\n\nБольше информации в панели по ссылке : https://ugo-vape.ru/__admin-panel/", data.id, new_status, data.customer_name, data.customer_email, data.customer_self_description, data.date_time_added)
}