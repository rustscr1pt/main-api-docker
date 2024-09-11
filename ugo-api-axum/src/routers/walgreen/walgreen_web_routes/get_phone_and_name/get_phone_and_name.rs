use std::sync::Arc;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use mysql::PooledConn;
use tokio::sync::Mutex;
use crate::generic_replies::generic_replies::reply_with_message;
use crate::routers::walgreen::walgreen_web_routes::get_phone_and_name::get_phone_and_name_sql::get_phone_and_name_sql;
use crate::routers::walgreen::walgreen_web_routes::get_phone_and_name::write_order_notification_walgreen::write_order_notification_walgreen;
use crate::structs::structs::WriteDataBody;

pub async fn get_phone_and_name(main_actor : Extension<Arc<Mutex<PooledConn>>>, Json(body) : Json<WriteDataBody>) -> impl IntoResponse {
    let mut unlocked = main_actor.lock().await;
    match get_phone_and_name_sql(&mut unlocked, [body]) {
        Ok(_) => {
            match write_order_notification_walgreen().await {
                Ok(()) => {
                    reply_with_message(true, "Ваш запрос был отправлен! Мы свяжемся с вами как можно скорее.")
                }
                Err(err) => {
                    reply_with_message(false, err)
                }
            }
        }
        Err(err) => {
            reply_with_message(false, err)
        }
    }
}