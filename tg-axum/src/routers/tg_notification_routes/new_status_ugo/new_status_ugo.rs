use std::sync::Arc;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use crate::generic_replies::generic_replies::reply_with_message;
use crate::routers::tg_notification_routes::new_status_ugo::fetch_updated_order_ugo::fetch_updated_order_ugo;
use crate::structs::extension_structs::SQLAndTelegramWebExtension;
use crate::structs::structs::{UpdateStatusTelegramRequest};

pub async fn new_status_ugo(main_actor : Extension<SQLAndTelegramWebExtension>, Json(body) : Json<UpdateStatusTelegramRequest>) -> impl IntoResponse {
    if body.key == r#"XP{B3edA"s$i4im78u-Jt3BkTBH]%("# {
        match fetch_updated_order_ugo(Arc::clone(&main_actor.arc_sql), Arc::clone(&main_actor.telegram_bot), body.id, body.new_status).await {
            Ok(()) => {
                reply_with_message(true, "Notification has been sent.")
            }
            Err(err) => {
                reply_with_message(false, err)
            }
        }
    }
    else {
        reply_with_message(false, "Wrong keygen! Please pick another one.")
    }
}