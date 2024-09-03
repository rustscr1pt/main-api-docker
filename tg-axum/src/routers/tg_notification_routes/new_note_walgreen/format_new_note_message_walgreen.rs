use crate::structs::structs::NoteObjectNotationFull;

pub fn format_new_note_message_walgreen(object : &NoteObjectNotationFull) -> String {
    return format!("Добавлен новый комментарий к заявке №{} с сайта : {}\n\nСодержание : '{}'\n\nВремя добавления : {}", object.related_id, "Walgreen", object.text_info, object.date_time)
}