use std::sync::Arc;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use crate::generic_replies::generic_replies::reply_with_message;
use crate::routers::tg_notification_routes::new_order_ugo::get_last_record_sql_ugo::get_last_record_sql_ugo;
use crate::structs::extension_structs::SQLAndTelegramWebExtension;
use crate::structs::structs::TelegramRequest;

pub async fn new_order_ugo(main_actor : Extension<SQLAndTelegramWebExtension>, Json(body) : Json<TelegramRequest>) -> impl IntoResponse {
    if body.key == r#"XP{B3edA"s$i4im78u-Jt3BkTBH]%("# {
        match get_last_record_sql_ugo(Arc::clone(&main_actor.arc_sql), Arc::clone(&main_actor.telegram_bot)).await {
            Ok(()) => {
                reply_with_message(true, "Notification has been sent")
            }
            Err(e) => {
                reply_with_message(false, e)
            }
        }
    }
    else {
        reply_with_message(false, "Wrong keygen! Please pick another one.")
    }
}